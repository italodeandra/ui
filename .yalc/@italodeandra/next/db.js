"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearPromise = exports.connectDb = exports.client = void 0;
const mongodb_1 = require("mongodb");
const papr_1 = __importDefault(require("papr"));
const isServer_1 = require("./utils/isServer");
let uri = process.env.MONGODB_URI;
const appEnv = process.env.APP_ENV;
const options = {};
// @ts-expect-error global
const papr = (global._papr =
    // @ts-expect-error global
    global._papr || (0, isServer_1.onlyServer)(() => new papr_1.default()));
// noinspection JSUnusedGlobalSymbols
async function connectDb(afterConnected) {
    // @ts-expect-error global
    if (global._dbPromise) {
        // @ts-expect-error global
        return global._dbPromise;
    }
    const connect = async () => {
        if (!uri && appEnv !== "production") {
            const { MongoMemoryServer } = await Promise.resolve().then(() => __importStar(require("mongodb-memory-server")));
            const mongod = await MongoMemoryServer.create({
                instance: {
                    port: 5432,
                    dbName: process.env.MONGODB_MEMORY_SERVER_DBNAME,
                },
            });
            uri = `${mongod.getUri()}${process.env.MONGODB_MEMORY_SERVER_DBNAME || "test"}`;
        }
        if (!uri) {
            throw Error("[MongoDB] URI not found");
        }
        exports.client = new mongodb_1.MongoClient(uri, options);
        await exports.client.connect();
        papr.initialize(exports.client.db());
        await papr.updateSchemas();
        // await wait("3s");
        if (afterConnected) {
            for (const runAfterConnected of afterConnected) {
                await runAfterConnected(exports.client.db());
            }
        }
        console.info(`[MongoDB] Connected to "${uri}"`);
        return papr;
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global._dbPromise = connect();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await global._dbPromise;
}
exports.connectDb = connectDb;
// noinspection JSUnusedGlobalSymbols
function clearPromise() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete global._dbPromise;
}
exports.clearPromise = clearPromise;
exports.default = papr;
