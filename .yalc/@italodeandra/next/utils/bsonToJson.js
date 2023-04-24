"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bsonToJson(value) {
    if (value === undefined || value === null) {
        return value;
    }
    try {
        return JSON.parse(JSON.stringify(value));
    }
    catch (e) {
        console.error(e);
    }
}
exports.default = bsonToJson;
