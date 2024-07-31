"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooManyRequests = exports.internalServerError = exports.conflict = exports.notFound = exports.unauthorized = exports.badRequest = void 0;
/**
 * Respond with a bad request response.
 */
const badRequest = (res, body) => {
    const error = { status: 400, message: "Bad Request" };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
exports.badRequest = badRequest;
/**
 * Respond with an unauthorized response.
 */
const unauthorized = (res, body) => {
    const error = { status: 401, message: "Unauthorized" };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
exports.unauthorized = unauthorized;
/**
 * Respond with a not found response.
 */
const notFound = (res, body) => {
    const error = { status: 404, message: "Not Found" };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
exports.notFound = notFound;
/**
 * Respond with a conflict response.
 */
const conflict = (res, body) => {
    const error = { status: 409, message: "Conflict" };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
exports.conflict = conflict;
/**
 * Respond with an internal server error response.
 */
const internalServerError = (res, body) => {
    const error = {
        status: 500,
        message: "Internal Server Error",
    };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
exports.internalServerError = internalServerError;
const tooManyRequests = (res, body) => {
    const error = { status: 429, message: "Too Many Requests" };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
exports.tooManyRequests = tooManyRequests;
