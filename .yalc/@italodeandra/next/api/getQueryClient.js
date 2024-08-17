import { isServer, QueryClient } from "@tanstack/react-query";
function makeQueryClient(defaultOptions) {
    return new QueryClient({
        defaultOptions,
    });
}
let browserQueryClient = undefined;
export default function getQueryClient(defaultOptions) {
    if (isServer) {
        return makeQueryClient(defaultOptions);
    }
    else {
        if (!browserQueryClient)
            browserQueryClient = makeQueryClient(defaultOptions);
        return browserQueryClient;
    }
}
