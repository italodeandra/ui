import { apiHandlerWrapper, mutationFnWrapper, queryFnWrapper, } from "./apiHandlerWrapper";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
export default function createApi(queryKey, handler, apiOptions) {
    const apiHandler = apiHandlerWrapper(handler);
    const Types = {};
    // noinspection JSUnusedGlobalSymbols
    return {
        queryKey,
        handler: apiHandler,
        unwrappedHandler: handler,
        Types,
        useQuery: (args, options) => useQuery({
            queryKey: [queryKey, ...(apiOptions?.queryKeyMap?.(args) || [])],
            queryFn: queryFnWrapper(queryKey, args),
            ...apiOptions?.queryOptions,
            ...options,
        }),
        useInfiniteQuery: (args, options) => useInfiniteQuery({
            queryKey: [queryKey, ...(apiOptions?.queryKeyMap?.(args) || [])],
            queryFn: ({ pageParam }) => queryFnWrapper(queryKey, { ...args, pageParam })(),
            ...apiOptions?.infiniteQueryOptions,
            ...options,
        }),
        useMutation: (options) => {
            const queryClient = useQueryClient();
            return useMutation({
                mutationKey: [queryKey],
                mutationFn: mutationFnWrapper(queryKey),
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
        invalidateQueries: (queryClient, args) => queryClient.invalidateQueries({
            queryKey: [
                queryKey,
                ...(apiOptions?.queryKeyMap?.(args) || []).filter(Boolean),
            ],
        }),
        prefetchQuery: (queryClient, args, req, res) => queryClient.prefetchQuery({
            queryKey: [queryKey, ...(apiOptions?.queryKeyMap?.(args) || [])],
            queryFn: () => handler(args, req, res),
        }),
        refetchQueries: (queryClient, args) => queryClient.refetchQueries({
            queryKey: [queryKey, ...(apiOptions?.queryKeyMap?.(args) || [])],
        }),
        cancelQueries: (queryClient, args) => queryClient.cancelQueries({
            queryKey: [queryKey, ...(apiOptions?.queryKeyMap?.(args) || [])],
        }),
        getQueryData: (queryClient, args) => queryClient.getQueryData([
            queryKey,
            ...(apiOptions?.queryKeyMap?.(args) || []),
        ]),
        setQueryData: (queryClient, updater, args) => queryClient.setQueryData([queryKey, ...(apiOptions?.queryKeyMap?.(args) || [])], updater),
    };
}
