"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooManyRequests = exports.internalServerError = exports.conflict = exports.notFound = exports.unauthorized = exports.badRequest = void 0;
/**
 * Respond with a bad request response.
 */
var badRequest = function (res, body) {
    res.status(400).send(__assign({ message: "Bad Request" }, body));
    return {
        status: 400,
        body: body,
    };
};
exports.badRequest = badRequest;
/**
 * Respond with an unauthorized response.
 */
var unauthorized = function (res, body) {
    res.status(401).send(__assign({ message: "Unauthorized" }, body));
    return {
        status: 401,
        body: body,
    };
};
exports.unauthorized = unauthorized;
/**
 * Respond with a not found response.
 */
var notFound = function (res, body) {
    res.status(404).send(__assign({ message: "Not Found" }, body));
    return {
        status: 404,
        body: body,
    };
};
exports.notFound = notFound;
/**
 * Respond with a conflict response.
 */
var conflict = function (res, body) {
    res.status(409).send(__assign({ message: "Conflict" }, body));
    return {
        status: 409,
        body: body,
    };
};
exports.conflict = conflict;
/**
 * Respond with an internal server error response.
 */
var internalServerError = function (res, body) {
    res.status(500).send(__assign({ message: "Internal Server Error" }, body));
    return {
        status: 500,
        body: body,
    };
};
exports.internalServerError = internalServerError;
var tooManyRequests = function (res, body) {
    res.status(429).send(__assign({ message: "Too Many Requests" }, body));
    return {
        status: 429,
        body: body,
    };
};
exports.tooManyRequests = tooManyRequests;
