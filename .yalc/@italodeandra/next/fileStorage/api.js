"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectToFileStorage_1 = __importDefault(require("./connectToFileStorage"));
const errors_1 = require("../api/errors");
const handler = async (req, res) => {
    try {
        const minio = await (0, connectToFileStorage_1.default)();
        const { fileStorage: params } = req.query;
        if (!params?.length) {
            // noinspection ExceptionCaughtLocallyJS
            throw errors_1.badRequest;
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
            throw errors_1.notFound;
        }
        console.error(e);
        (0, errors_1.internalServerError)(res);
    }
};
const FileStorage = () => {
    return handler;
};
exports.default = FileStorage;
