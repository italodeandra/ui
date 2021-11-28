"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = exports.use = void 0;
var cors_1 = __importDefault(require("./cors"));
exports.cors = cors_1.default;
var next_api_middleware_1 = require("next-api-middleware");
Object.defineProperty(exports, "use", { enumerable: true, get: function () { return next_api_middleware_1.use; } });
