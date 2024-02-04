"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyServer = exports.isServer = void 0;
/**
 * Tells if the current scope is a server.
 */
exports.isServer = typeof window === "undefined";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onlyServer(variable, fallback) {
    if (exports.isServer) {
        return variable();
    }
    return fallback;
}
exports.onlyServer = onlyServer;
