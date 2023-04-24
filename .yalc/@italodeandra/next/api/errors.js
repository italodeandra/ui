"use strict";
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
exports.isError = exports.tooManyRequests = exports.internalServerError = exports.conflict = exports.notFound = exports.unauthorized = exports.badRequest = void 0;
var Error = Symbol();
/**
 * Respond with a bad request response.
 */
var badRequest = function (res, body) {
    res.status(400).send(__assign({ message: "Bad Request" }, body));
    return Error;
};
exports.badRequest = badRequest;
/**
 * Respond with an unauthorized response.
 */
var unauthorized = function (res, body) {
    res.status(401).send(__assign({ message: "Unauthorized" }, body));
    return Error;
};
exports.unauthorized = unauthorized;
/**
 * Respond with a not found response.
 */
var notFound = function (res, body) {
    res.status(404).send(__assign({ message: "Not Found" }, body));
    return Error;
};
exports.notFound = notFound;
/**
 * Respond with a conflict response.
 */
var conflict = function (res, body) {
    res.status(409).send(__assign({ message: "Conflict" }, body));
    return Error;
};
exports.conflict = conflict;
/**
 * Respond with an internal server error response.
 */
var internalServerError = function (res, body) {
    res.status(500).send(__assign({ message: "Internal Server Error" }, body));
    return Error;
};
exports.internalServerError = internalServerError;
var tooManyRequests = function (res, body) {
    res.status(429).send(__assign({ message: "Too Many Requests" }, body));
    return Error;
};
exports.tooManyRequests = tooManyRequests;
var isError = function (error) {
    return error === exports.badRequest ||
        error === exports.unauthorized ||
        error === exports.notFound ||
        error === exports.conflict ||
        error === exports.internalServerError ||
        error === exports.tooManyRequests;
};
exports.isError = isError;
