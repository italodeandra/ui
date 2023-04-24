"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isServer = typeof window === "undefined";
var bson_objectid_1 = __importDefault(require("bson-objectid"));
var bson_1 = require("bson");
function isomorphicObjectId(inputId) {
    if (isServer) {
        return new bson_1.ObjectId(inputId);
    }
    else {
        return new bson_objectid_1.default(inputId);
    }
}
exports.default = isomorphicObjectId;
