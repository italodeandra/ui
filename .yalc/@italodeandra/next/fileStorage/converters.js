"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToBlobUrl = exports.bufferToBase64 = exports.base64ToBuffer = exports.blobUrlToBase64 = exports.blobUrlToObject = exports.blobToBase64 = void 0;
function blobToBase64(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.onloadend = () => resolve(reader.result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.readAsDataURL(blob);
    });
}
exports.blobToBase64 = blobToBase64;
async function blobUrlToObject(url) {
    const r = await fetch(url);
    return await r.blob();
}
exports.blobUrlToObject = blobUrlToObject;
// noinspection JSUnusedGlobalSymbols
async function blobUrlToBase64(url) {
    if (!url.startsWith("blob")) {
        return url;
    }
    return await blobToBase64(await blobUrlToObject(url));
}
exports.blobUrlToBase64 = blobUrlToBase64;
function base64ToBuffer(base64) {
    return Buffer.from(base64.replace(/^data:.+;base64,/, ""), "base64");
}
exports.base64ToBuffer = base64ToBuffer;
function bufferToBase64(buffer) {
    return buffer.toString("base64");
}
exports.bufferToBase64 = bufferToBase64;
// noinspection JSUnusedGlobalSymbols
function base64ToBlobUrl(base64) {
    if (!base64.startsWith("data:")) {
        return base64;
    }
    return fetch(base64)
        .then((res) => res.blob())
        .then((blob) => URL.createObjectURL(blob));
}
exports.base64ToBlobUrl = base64ToBlobUrl;
