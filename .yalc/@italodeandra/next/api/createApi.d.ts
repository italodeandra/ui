import { InferApiArgs, InferApiResponse } from "./apiHandlerWrapper";
import { QueryClient, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";
type Any = any;
export default function createApi<T extends (args: Any, req: NextApiRequest, res: NextApiResponse, ...rest: Any) => Any, C extends Record<string, Any>>(queryKey: string, handler: T, apiOptions?: {
    queryKeyMap?: (args?: InferApiArgs<T>) => unknown[];
    mutationOptions?: {
        onMutate?: (variables: InferApiArgs<T>, queryClient: QueryClient) => Promise<C> | C | void;
        onSuccess?: (data: InferApiResponse<T>, variables: InferApiArgs<T>, context: C | undefined, queryClient: QueryClient) => Promise<C> | C | void;
        onError?: (error: AxiosError, variables: InferApiArgs<T>, context: C | undefined, queryClient: QueryClient) => Promise<C> | C | void;
        onSettled?: (data: InferApiResponse<T> | undefined, error: AxiosError | null, variables: InferApiArgs<T>, context: C | undefined, queryClient: QueryClient) => Promise<C> | C | void;
    };
}): {
    handler: import("next").NextApiHandler;
    unwrappedHandler: T;
    Types: {
        Args: InferApiArgs<T>;
        Response: InferApiResponse<T>;
        QueryOptions: UseQueryOptions<InferApiResponse<T>, unknown, InferApiResponse<T>, import("@tanstack/react-query").QueryKey>;
        MutationOptions: UseMutationOptions<InferApiResponse<T>, AxiosError<unknown, any>, InferApiArgs<T>, unknown>;
    };
    useQuery: (args?: InferApiArgs<T> | undefined, options?: UseQueryOptions<InferApiResponse<T>, unknown, InferApiResponse<T>, import("@tanstack/react-query").QueryKey> | undefined) => import("@tanstack/react-query").UseQueryResult<InferApiResponse<T>, unknown>;
    useMutation: (options?: UseMutationOptions<InferApiResponse<T>, AxiosError<unknown, any>, InferApiArgs<T>, unknown> | undefined) => import("@tanstack/react-query").UseMutationResult<InferApiResponse<T>, AxiosError<unknown, any>, InferApiArgs<T>, C>;
    invalidateQueries: (queryClient: QueryClient, args?: InferApiArgs<T> | undefined) => Promise<void>;
    prefetchQuery: (queryClient: QueryClient, args: InferApiArgs<T>, req?: NextApiRequest | GetServerSidePropsContext["req"], res?: NextApiResponse | GetServerSidePropsContext["res"]) => Promise<void>;
    refetchQueries: (queryClient: QueryClient, args?: InferApiArgs<T> | undefined) => Promise<void>;
    cancelQueries: (queryClient: QueryClient, args?: InferApiArgs<T> | undefined) => Promise<void>;
    getQueryData: (queryClient: QueryClient, args?: InferApiArgs<T> | undefined) => InferApiResponse<T> | undefined;
    setQueryData: (queryClient: QueryClient, updater: import("@tanstack/query-core/build/types/packages/query-core/src/utils").Updater<import("../utils/Jsonify").default<T extends import("type-fest/source/async-return-type").AsyncFunction ? Awaited<ReturnType<T>> : ReturnType<T>> | undefined, import("../utils/Jsonify").default<T extends import("type-fest/source/async-return-type").AsyncFunction ? Awaited<ReturnType<T>> : ReturnType<T>> | undefined>, args?: InferApiArgs<T> | undefined) => import("../utils/Jsonify").default<T extends import("type-fest/source/async-return-type").AsyncFunction ? Awaited<ReturnType<T>> : ReturnType<T>> | undefined;
};
export {};
