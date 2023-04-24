/**
 * Tells if the current scope is a server.
 */
export declare const isServer: boolean;
export declare function onlyServer<T>(variable: () => T, fallback?: any): T;
