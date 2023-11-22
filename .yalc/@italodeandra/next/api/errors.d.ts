import type { NextApiResponse } from "next";
/**
 * Respond with a bad request response.
 */
export declare const badRequest: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    status: number;
    body: {
        [key: string]: any;
    } | undefined;
};
/**
 * Respond with an unauthorized response.
 */
export declare const unauthorized: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    status: number;
    body: {
        [key: string]: any;
    } | undefined;
};
/**
 * Respond with a not found response.
 */
export declare const notFound: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    status: number;
    body: {
        [key: string]: any;
    } | undefined;
};
/**
 * Respond with a conflict response.
 */
export declare const conflict: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    status: number;
    body: {
        [key: string]: any;
    } | undefined;
};
/**
 * Respond with an internal server error response.
 */
export declare const internalServerError: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    status: number;
    body: {
        [key: string]: any;
    } | undefined;
};
export declare const tooManyRequests: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    status: number;
    body: {
        [key: string]: any;
    } | undefined;
};
