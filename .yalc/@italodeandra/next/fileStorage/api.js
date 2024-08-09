import connectToFileStorage from "./connectToFileStorage";
import { badRequest, internalServerError, notFound } from "../api/errors";
const handler = async (req, res) => {
    try {
        const minio = await connectToFileStorage();
        const { fileStorage: params } = req.query;
        if (!params?.length) {
            // noinspection ExceptionCaughtLocallyJS
            throw badRequest;
        }
        if (!process.env.S3_BUCKET_NAME) {
            // noinspection ExceptionCaughtLocallyJS
            throw Error("Missing S3_BUCKET_NAME env var");
        }
        const file = await minio.getObject(process.env.S3_BUCKET_NAME, params.join("/"));
        await new Promise(function (resolve) {
            file.pipe(res);
            file.on("end", (buffer) => resolve(buffer));
        });
    }
    catch (e) {
        if (typeof e === "function") {
            throw e;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = e;
        if (err.code === "NoSuchKey") {
            throw notFound;
        }
        console.error(e);
        internalServerError(res);
    }
};
const FileStorage = () => {
    return handler;
};
export default FileStorage;
