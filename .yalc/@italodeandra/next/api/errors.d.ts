import type { NextApiResponse } from "next";
/**
 * Respond with a bad request response.
 */
export declare const badRequest: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    body: {
        [key: string]: any;
    } | undefined;
    status: number;
    message: string;
};
/**
 * Respond with an unauthorized response.
 */
export declare const unauthorized: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    body: {
        [key: string]: any;
    } | undefined;
    status: number;
    message: string;
};
/**
 * Respond with a not found response.
 */
export declare const notFound: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    body: {
        [key: string]: any;
    } | undefined;
    status: number;
    message: string;
};
/**
 * Respond with a conflict response.
 */
export declare const conflict: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    body: {
        [key: string]: any;
    } | undefined;
    status: number;
    message: string;
};
/**
 * Respond with an internal server error response.
 */
export declare const internalServerError: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    body: {
        [key: string]: any;
    } | undefined;
    status: number;
    message: string;
};
export declare const tooManyRequests: (res: NextApiResponse, body?: {
    [key: string]: any;
} | undefined) => {
    body: {
        [key: string]: any;
    } | undefined;
    status: number;
    message: string;
};
