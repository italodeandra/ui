/**
 * Tells if the current scope is a server.
 */
export const isServer = typeof window === "undefined";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onlyServer(variable, fallback) {
    if (isServer) {
        return variable();
    }
    return fallback;
}
