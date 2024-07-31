"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function asyncMap(arr, predicate) {
    return arr ? Promise.all(arr.map(predicate)) : [];
}
exports.default = asyncMap;
