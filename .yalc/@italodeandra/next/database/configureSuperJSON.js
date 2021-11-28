"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bson_objectid_1 = __importDefault(require("bson-objectid"));
var mongodb_1 = require("mongodb");
var superjson_1 = __importDefault(require("superjson"));
var isServer = typeof window === "undefined";
if (isServer) {
    superjson_1.default.registerCustom({
        isApplicable: function (v) { return v instanceof mongodb_1.ObjectId; },
        serialize: function (v) { return v.toString(); },
        deserialize: function (v) { return new mongodb_1.ObjectId(v); },
    }, "objectid");
}
else {
    superjson_1.default.registerCustom({
        isApplicable: function (v) { return v instanceof bson_objectid_1.default; },
        serialize: function (v) { return v.toString(); },
        deserialize: function (v) { return new bson_objectid_1.default(v); },
    }, "objectid");
}
