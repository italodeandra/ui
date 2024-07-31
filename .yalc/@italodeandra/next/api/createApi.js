"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiHandlerWrapper_1 = require("./apiHandlerWrapper");
const react_query_1 = require("@tanstack/react-query");
function createApi(queryKey, handler, apiOptions) {
    const apiHandler = (0, apiHandlerWrapper_1.apiHandlerWrapper)(handler);
    const Types = {};
    // noinspection JSUnusedGlobalSymbols
    return {
        handler: apiHandler,
        unwrappedHandler: handler,
        Types,
        useQuery: (args, options) => (0, react_query_1.useQuery)([queryKey, ...(apiOptions?.queryKeyMap?.(args) || [])], (0, apiHandlerWrapper_1.queryFnWrapper)(queryKey, args), options),
        useMutation: (options) => {
            const queryClient = (0, react_query_1.useQueryClient)();
            return (0, react_query_1.useMutation)([queryKey], (0, apiHandlerWrapper_1.mutationFnWrapper)(queryKey), {
                ...options,
                async onMutate(...params) {
                    return {
                        ...((await apiOptions?.mutationOptions?.onMutate?.(...params, queryClient)) || {}),
                        ...((await options?.onMutate?.(...params)) || {}),
                    };
                },
                async onError(...params) {
                    return {
                        ...((await apiOptions?.mutationOptions?.onError?.(...params, queryClient)) || {}),
                        ...((await options?.onError?.(...params)) || {}),
                    };
                },
                async onSuccess(...params) {
                    return {
                        ...((await apiOptions?.mutationOptions?.onSuccess?.(...params, queryClient)) || {}),
                        ...((await options?.onSuccess?.(...params)) || {}),
                    };
                },
                async onSettled(...params) {
                    return {
                        ...((await apiOptions?.mutationOptions?.onSettled?.(...params, queryClient)) || {}),
                        ...((await options?.onSettled?.(...params)) || {}),
                    };
                },
            });
        },
        invalidateQueries: (queryClient, args) => queryClient.invalidateQueries([
            queryKey,
            ...(apiOptions?.queryKeyMap?.(args) || []),
        ]),
        prefetchQuery: (queryClient, args, req, res) => queryClient.prefetchQuery([queryKey, ...(apiOptions?.queryKeyMap?.(args) || [])], () => handler(args, req, res)),
        refetchQueries: (queryClient, args) => queryClient.refetchQueries([
            queryKey,
            ...(apiOptions?.queryKeyMap?.(args) || []),
        ]),
        cancelQueries: (queryClient, args) => queryClient.cancelQueries([
            queryKey,
            ...(apiOptions?.queryKeyMap?.(args) || []),
        ]),
        getQueryData: (queryClient, args) => queryClient.getQueryData([
            queryKey,
            ...(apiOptions?.queryKeyMap?.(args) || []),
        ]),
        setQueryData: (queryClient, updater, args) => queryClient.setQueryData([queryKey, ...(apiOptions?.queryKeyMap?.(args) || [])], updater),
    };
}
exports.default = createApi;
