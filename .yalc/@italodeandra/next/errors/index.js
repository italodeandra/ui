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
exports.internalServerError = exports.conflict = exports.notFound = exports.unauthorized = exports.badRequest = void 0;
/**
 * Respond with a bad request response.
 */
var badRequest = function (res, body) { return res.status(400).send(__assign({ message: "Bad Request" }, body)); };
exports.badRequest = badRequest;
/**
 * Respond with an unauthorized response.
 */
var unauthorized = function (res, body) { return res.status(401).send(__assign({ message: "Unauthorized" }, body)); };
exports.unauthorized = unauthorized;
/**
 * Respond with a not found response.
 */
var notFound = function (res, body) {
    return res.status(404).send(__assign({ message: "Not Found" }, body));
};
exports.notFound = notFound;
/**
 * Respond with a conflict response.
 */
var conflict = function (res, body) {
    return res.status(409).send(__assign({ message: "Conflict" }, body));
};
exports.conflict = conflict;
/**
 * Respond with an internal server error response.
 */
var internalServerError = function (res, body) { return res.status(500).send(__assign({ message: "Internal Server Error" }, body)); };
exports.internalServerError = internalServerError;
