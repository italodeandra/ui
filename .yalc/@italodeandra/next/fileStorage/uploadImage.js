"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.uploadImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const connectToFileStorage_1 = __importDefault(require("./connectToFileStorage"));
const converters_1 = require("./converters");
// noinspection JSUnusedGlobalSymbols
async function uploadImage(image, objectName, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
metaData) {
    if (process.env.APP_ENV === "development") {
        return image;
    }
    if (!image?.startsWith("data:")) {
        return image;
    }
    const fileStorage = await (0, connectToFileStorage_1.default)();
    const buffer = (0, converters_1.base64ToBuffer)(image);
    const resizedBuffer = await (0, sharp_1.default)(buffer)
        .resize({
        width: 500,
        withoutEnlargement: true,
        fastShrinkOnLoad: true,
    })
        .toBuffer();
    objectName = `${objectName}.jpg`;
    if (!process.env.S3_BUCKET_NAME) {
        throw Error("Missing S3_BUCKET_NAME env var");
    }
    const result = await fileStorage.putObject(process.env.S3_BUCKET_NAME, objectName, resizedBuffer, {
        "Content-Type": "image/jpeg",
        ...metaData,
    });
    if (!result.etag) {
        throw Error(`There was an unexpected error trying to upload "${image}"`);
    }
    return `/file/${objectName}`;
}
exports.uploadImage = uploadImage;
// noinspection JSUnusedGlobalSymbols
async function uploadFile(file, objectFileName, contentType, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
metaData) {
    if (process.env.APP_ENV === "development") {
        return file;
    }
    if (!file?.startsWith("data:")) {
        return file;
    }
    const fileStorage = await (0, connectToFileStorage_1.default)();
    const buffer = (0, converters_1.base64ToBuffer)(file);
    if (!process.env.S3_BUCKET_NAME) {
        throw Error("Missing S3_BUCKET_NAME env var");
    }
    const result = await fileStorage.putObject(process.env.S3_BUCKET_NAME, objectFileName, buffer, {
        "Content-Type": contentType,
        ...metaData,
    });
    if (!result.etag) {
        throw Error(`There was an unexpected error trying to upload "${file}"`);
    }
    return `/file/${objectFileName}`;
}
exports.uploadFile = uploadFile;
