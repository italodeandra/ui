import { Client } from "minio";
import { onlyServer } from "../utils/isServer";
const _global = (onlyServer(() => global) || {});
export default async function connectToFileStorage() {
    if (_global._minio) {
        return _global._minio;
    }
    if (!process.env.S3_ENDPOINT) {
        throw Error("Missing S3_ENDPOINT env var");
    }
    if (!process.env.S3_ACCESS_KEY) {
        throw Error("Missing S3_ACCESS_KEY env var");
    }
    if (!process.env.S3_SECRET_KEY) {
        throw Error("Missing S3_SECRET_KEY env var");
    }
    if (!process.env.S3_BUCKET_NAME) {
        throw Error("Missing S3_BUCKET_NAME env var");
    }
    if (!process.env.S3_REGION) {
        throw Error("Missing S3_REGION env var");
    }
    _global._minio = new Client({
        endPoint: process.env.S3_ENDPOINT,
        useSSL: process.env.S3_USE_SSL === "true",
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY,
        port: !isNaN(parseInt(process.env.S3_PORT || ""))
            ? parseInt(process.env.S3_PORT || "")
            : undefined,
        region: process.env.S3_REGION,
    });
    if (!(await _global._minio.bucketExists(process.env.S3_BUCKET_NAME))) {
        await _global._minio.makeBucket(process.env.S3_BUCKET_NAME, process.env.S3_REGION);
    }
    return _global._minio;
}
