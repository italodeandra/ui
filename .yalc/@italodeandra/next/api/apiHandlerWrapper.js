import bsonToJson from "../utils/bsonToJson";
import { internalServerError } from "./errors";
import log from "../log";
// noinspection JSUnusedGlobalSymbols
export const apiHandlerWrapper = (handler) => (async (req, res) => {
    if (req.method === "OPTIONS")
        return res.send(undefined);
    try {
        const data = await handler((req.method === "POST"
            ? req.body
            : req.query) || {}, req, res);
        res.send(bsonToJson(data));
    }
    catch (e) {
        const err = (e instanceof Function ? e(res) : e);
        const noLog = err.body?.noLog;
        delete err.body?.noLog;
        const mongoError = e;
        console.error(err);
        if (mongoError.errInfo || mongoError.writeErrors) {
            console.error(JSON.stringify(mongoError.errInfo || mongoError.writeErrors, null, 2));
        }
        if (!noLog) {
            void log({
                url: req.url,
                requestHeaders: req.headers,
                errorMessage: err.message,
                errorStack: err.stack,
                errorInfo: mongoError.errInfo || mongoError.writeErrors || err.body,
                requestBody: req.body,
                requestQuery: req.query,
                statusCode: err.status || 500,
            });
        }
        if (!res.headersSent) {
            internalServerError(res);
        }
    }
});
// noinspection JSUnusedGlobalSymbols
export const queryFnWrapper = (queryKey, args) => (reactQuerySignal) => fetch(queryKey +
    (args
        ? `?${new URLSearchParams(JSON.parse(JSON.stringify(args)))}`
        : ""), {
    signal: reactQuerySignal?.signal,
}).then(async (res) => {
    let data;
    try {
        data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
// noinspection JSUnusedGlobalSymbols
export const mutationFnWrapper = (mutationKey) => (args) => fetch(mutationKey, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
}).then(async (res) => {
    let data;
    try {
        data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
