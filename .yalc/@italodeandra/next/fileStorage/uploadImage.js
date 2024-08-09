import sharp from "sharp";
import connectToFileStorage from "./connectToFileStorage";
import { base64ToBuffer } from "./converters";
// noinspection JSUnusedGlobalSymbols
export async function uploadImage(image, objectName, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
metaData) {
    if (process.env.APP_ENV === "development") {
        return image;
    }
    if (!image?.startsWith("data:")) {
        return image;
    }
    const fileStorage = await connectToFileStorage();
    const buffer = base64ToBuffer(image);
    const resizedBuffer = await sharp(buffer)
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
    const result = await fileStorage.putObject(process.env.S3_BUCKET_NAME, objectName, resizedBuffer, undefined, {
        "Content-Type": "image/jpeg",
        ...metaData,
    });
    if (!result.etag) {
        throw Error(`There was an unexpected error trying to upload "${image}"`);
    }
    return `/file/${objectName}`;
}
// noinspection JSUnusedGlobalSymbols
export async function uploadFile(file, objectFileName, contentType, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
metaData) {
    if (process.env.APP_ENV === "development") {
        return file;
    }
    if (!file?.startsWith("data:")) {
        return file;
    }
    const fileStorage = await connectToFileStorage();
    const buffer = base64ToBuffer(file);
    if (!process.env.S3_BUCKET_NAME) {
        throw Error("Missing S3_BUCKET_NAME env var");
    }
    const result = await fileStorage.putObject(process.env.S3_BUCKET_NAME, objectFileName, buffer, undefined, {
        "Content-Type": contentType,
        ...metaData,
    });
    if (!result.etag) {
        throw Error(`There was an unexpected error trying to upload "${file}"`);
    }
    return `/file/${objectFileName}`;
}
