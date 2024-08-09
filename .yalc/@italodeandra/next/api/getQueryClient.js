import { isServer, QueryClient } from "@tanstack/react-query";
function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: { refetchOnWindowFocus: false }
        }
    });
}
let browserQueryClient = undefined;
export default function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    }
    else {
        if (!browserQueryClient)
            browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
