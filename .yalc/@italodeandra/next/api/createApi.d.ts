import { InferApiArgs, InferApiResponse } from "./apiHandlerWrapper";
import { QueryClient, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";
import type { UseInfiniteQueryOptions } from "@tanstack/react-query/src/types";
type Any = any;
export default function createApi<T extends (args: Any, req: NextApiRequest, res: NextApiResponse, ...rest: Any) => Any, C extends Record<string, Any>>(queryKey: string, handler: T, apiOptions?: {
    queryKeyMap?: (args?: InferApiArgs<T>) => unknown[];
    infiniteQueryOptions?: Partial<UseInfiniteQueryOptions<InferApiResponse<T>>>;
    queryOptions?: Partial<UseQueryOptions<InferApiResponse<T>>>;
    mutationOptions?: {
        onMutate?: (variables: InferApiArgs<T>, queryClient: QueryClient) => Promise<C> | C | void;
        onSuccess?: (data: InferApiResponse<T>, variables: InferApiArgs<T>, context: C | undefined, queryClient: QueryClient) => Promise<C> | C | void;
        onError?: (error: AxiosError, variables: InferApiArgs<T>, context: C | undefined, queryClient: QueryClient) => Promise<C> | C | void;
        onSettled?: (data: InferApiResponse<T> | undefined, error: AxiosError | null, variables: InferApiArgs<T>, context: C | undefined, queryClient: QueryClient) => Promise<C> | C | void;
    };
}): {
    queryKey: string;
    handler: import("next").NextApiHandler;
    unwrappedHandler: T;
    Types: {
        Args: InferApiArgs<T>;
        Response: InferApiResponse<T>;
        QueryOptions: Partial<UseQueryOptions<InferApiResponse<T>>>;
        InfiniteQueryOptions: Omit<UseInfiniteQueryOptions<InferApiResponse<T>>, "queryKey">;
        MutationOptions: Partial<UseMutationOptions<InferApiResponse<T>, AxiosError, InferApiArgs<T>>>;
    };
    useQuery: (args?: InferApiArgs<T>, options?: Partial<UseQueryOptions<InferApiResponse<T>, Error, InferApiResponse<T>, import("@tanstack/react-query").QueryKey>>) => import("@tanstack/react-query").UseQueryResult<InferApiResponse<T>, Error>;
    useInfiniteQuery: (args: InferApiArgs<T>, options: Omit<UseInfiniteQueryOptions<InferApiResponse<T>, Error, InferApiResponse<T>, InferApiResponse<T>, import("@tanstack/react-query").QueryKey, unknown>, "queryKey">) => import("@tanstack/react-query").UseInfiniteQueryResult<import("@tanstack/react-query").InfiniteData<InferApiResponse<T>, unknown>, Error>;
    useMutation: (options?: Partial<UseMutationOptions<InferApiResponse<T>, AxiosError<unknown, any>, InferApiArgs<T>, unknown>>) => import("@tanstack/react-query").UseMutationResult<InferApiResponse<T>, AxiosError<unknown, any>, InferApiArgs<T>, C>;
    invalidateQueries: (queryClient: QueryClient, args?: InferApiArgs<T>) => Promise<void>;
    prefetchQuery: (queryClient: QueryClient, args: InferApiArgs<T>, req?: NextApiRequest | GetServerSidePropsContext["req"], res?: NextApiResponse | GetServerSidePropsContext["res"]) => Promise<void>;
    refetchQueries: (queryClient: QueryClient, args?: InferApiArgs<T>) => Promise<void>;
    cancelQueries: (queryClient: QueryClient, args?: InferApiArgs<T>) => Promise<void>;
    getQueryData: (queryClient: QueryClient, args?: InferApiArgs<T>) => InferApiResponse<T> | undefined;
    setQueryData: (queryClient: QueryClient, updater: Parameters<typeof QueryClient.prototype.setQueryData<InferApiResponse<T>>>[1], args?: InferApiArgs<T>) => import("../utils/Jsonify").default<T extends import("type-fest/source/async-return-type").AsyncFunction ? Awaited<ReturnType<T>> : ReturnType<T>> | undefined;
};
export {};
