"use strict";
/* eslint-disable no-var */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var config_1 = __importDefault(require("next/config"));
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
var cached = global.mongo;
if (!cached) {
    cached = global.mongo = { conn: null, promise: null, collections: {} };
}
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, mongodbUri, appEnv, _b;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    config = (0, config_1.default)();
                    _a = config.serverRuntimeConfig || {}, mongodbUri = _a.mongodbUri, appEnv = _a.appEnv;
                    if (cached.conn) {
                        return [2 /*return*/, cached.conn];
                    }
                    if (!cached.promise) {
                        cached.promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var options, uri_1, MongoMemoryServer, mongod, conn, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 5, , 6]);
                                        options = {};
                                        uri_1 = mongodbUri;
                                        if (!(!uri_1 && appEnv !== "production")) return [3 /*break*/, 3];
                                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("mongodb-memory-server")); })];
                                    case 1:
                                        MongoMemoryServer = (_a.sent()).MongoMemoryServer;
                                        return [4 /*yield*/, MongoMemoryServer.create({
                                                instance: { port: 5432 },
                                            })];
                                    case 2:
                                        mongod = _a.sent();
                                        uri_1 = mongod.getUri();
                                        console.info("Started a MongoDB Memory Server at", uri_1);
                                        _a.label = 3;
                                    case 3:
                                        if (!uri_1) {
                                            // noinspection ExceptionCaughtLocallyJS
                                            throw new Error("Please define the MONGODB_URI environment variable");
                                        }
                                        return [4 /*yield*/, mongodb_1.MongoClient.connect(uri_1, options).then(function (client) { return ({
                                                client: client,
                                                db: client.db(),
                                                uri: uri_1,
                                            }); })];
                                    case 4:
                                        conn = _a.sent();
                                        resolve(conn);
                                        return [3 /*break*/, 6];
                                    case 5:
                                        e_1 = _a.sent();
                                        reject(e_1);
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    _b = cached;
                    return [4 /*yield*/, cached.promise];
                case 1:
                    _b.conn = _c.sent();
                    return [2 /*return*/, cached.conn];
            }
        });
    });
}
exports.default = connectToDatabase;
