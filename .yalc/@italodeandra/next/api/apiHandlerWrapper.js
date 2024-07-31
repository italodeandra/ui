"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationFnWrapper = exports.queryFnWrapper = exports.apiHandlerWrapper = void 0;
const bsonToJson_1 = __importDefault(require("../utils/bsonToJson"));
const errors_1 = require("./errors");
const log_1 = __importDefault(require("../log"));
// noinspection JSUnusedGlobalSymbols
const apiHandlerWrapper = (handler) => (async (req, res) => {
    if (req.method === "OPTIONS")
        return res.send(undefined);
    try {
        const data = await handler((req.method === "POST"
            ? req.body
            : req.query) || {}, req, res);
        res.send((0, bsonToJson_1.default)(data));
    }
    catch (e) {
        const err = (e instanceof Function ? e(res) : e);
        const noLog = err.body?.noLog;
        delete err.body?.noLog;
        const mongoError = e;
        console.error(err);
        if (mongoError.errInfo) {
            console.error(JSON.stringify(mongoError.errInfo, null, 2));
        }
        if (!noLog) {
            void (0, log_1.default)({
                url: req.url,
                requestHeaders: req.headers,
                errorMessage: err.message,
                errorStack: err.stack,
                errorInfo: mongoError.errInfo || err.body,
                requestBody: req.body,
                requestQuery: req.query,
                statusCode: err.status || 500,
            });
        }
        if (!res.headersSent) {
            (0, errors_1.internalServerError)(res);
        }
    }
});
exports.apiHandlerWrapper = apiHandlerWrapper;
// noinspection JSUnusedGlobalSymbols
const queryFnWrapper = (queryKey, args) => (reactQuerySignal) => fetch(queryKey +
    (args
        ? `?${new URLSearchParams(JSON.parse(JSON.stringify(args)))}`
        : ""), {
    signal: reactQuerySignal?.signal,
}).then(async (res) => {
    let data;
    try {
        data = await res.json();
    }
    catch (e) {
        throw {
            code: res.status,
        };
    }
    if (res.ok) {
        return data;
    }
    throw {
        code: res.status,
        ...data,
    };
});
exports.queryFnWrapper = queryFnWrapper;
// noinspection JSUnusedGlobalSymbols
const mutationFnWrapper = (mutationKey) => (args) => fetch(mutationKey, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
}).then(async (res) => {
    let data;
    try {
        data = await res.json();
    }
    catch (e) {
        data = null;
    }
    if (res.ok) {
        return data;
    }
    console.error(res);
    throw {
        code: res.status,
        ...data,
    };
});
exports.mutationFnWrapper = mutationFnWrapper;
