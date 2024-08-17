export function blobToBase64(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.onloadend = () => resolve(reader.result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.readAsDataURL(blob);
    });
}
export async function blobUrlToObject(url) {
    const r = await fetch(url);
    return await r.blob();
}
// noinspection JSUnusedGlobalSymbols
export async function blobUrlToBase64(url) {
    if (!url.startsWith("blob")) {
        return url;
    }
    return await blobToBase64(await blobUrlToObject(url));
}
export function base64ToBuffer(base64) {
    return Buffer.from(base64.replace(/^data:.+;base64,/, ""), "base64");
}
// noinspection JSUnusedGlobalSymbols
export function bufferToBase64(buffer) {
    return buffer.toString("base64");
}
// noinspection JSUnusedGlobalSymbols
export function base64ToBlobUrl(base64) {
    if (!base64.startsWith("data:")) {
        return base64;
    }
    return fetch(base64)
        .then((res) => res.blob())
        .then((blob) => URL.createObjectURL(blob));
}
