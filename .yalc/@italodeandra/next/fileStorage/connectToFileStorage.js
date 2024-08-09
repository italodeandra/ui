/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Client } from "minio";
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore
let cached = global.minio;
if (!cached) {
    // @ts-ignore
    cached = global.minio = { conn: null };
}
export default async function connectToFileStorage() {
    if (cached.conn) {
        return cached.conn;
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
    cached.conn = new Client({
        endPoint: process.env.S3_ENDPOINT,
        useSSL: process.env.S3_USE_SSL === "true",
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY,
        port: !isNaN(parseInt(process.env.S3_PORT || ""))
            ? parseInt(process.env.S3_PORT || "")
            : undefined,
    });
    if (!(await cached.conn.bucketExists(process.env.S3_BUCKET_NAME))) {
        await cached.conn.makeBucket(process.env.S3_BUCKET_NAME, process.env.S3_REGION);
    }
    return cached.conn;
}
