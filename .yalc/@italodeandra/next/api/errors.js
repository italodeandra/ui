/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols
/**
 * Respond with a bad request response.
 */
export const badRequest = (res, body) => {
    const error = { status: 400, message: "Bad Request" };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
/**
 * Respond with an unauthorized response.
 */
export const unauthorized = (res, body) => {
    const error = { status: 401, message: "Unauthorized" };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
/**
 * Respond with a not found response.
 */
export const notFound = (res, body) => {
    const error = { status: 404, message: "Not Found" };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
/**
 * Respond with a conflict response.
 */
export const conflict = (res, body) => {
    const error = { status: 409, message: "Conflict" };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
/**
 * Respond with an internal server error response.
 */
export const internalServerError = (res, body) => {
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
export const tooManyRequests = (res, body) => {
    const error = { status: 429, message: "Too Many Requests" };
    res.status(error.status).send({ ...error, ...body });
    return {
        ...error,
        body,
    };
};
