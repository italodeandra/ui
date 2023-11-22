"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeStringify(obj, indent) {
    if (indent === void 0) { indent = 2; }
    var cache = [];
    var retVal = JSON.stringify(obj, function (key, value) {
        return typeof value === "object" && value !== null
            ? cache.includes(value)
                ? undefined
                : cache.push(value) && value
            : value;
    }, indent);
    cache = [];
    return retVal;
}
exports.default = safeStringify;
