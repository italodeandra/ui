"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeStringify(obj, indent) {
    let cache = [];
    const retVal = JSON.stringify(obj, (key, value) => typeof value === "object" && value !== null
        ? cache.includes(value)
            ? undefined
            : cache.push(value) && value
        : value, indent);
    cache = [];
    return retVal;
}
exports.default = safeStringify;
