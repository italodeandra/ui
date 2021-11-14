import { AxiosError, CancelTokenSource } from "axios";
import { ObjectId } from "bson";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDeepCompareEffect, useUpdateEffect } from "react-use";
import { deserialize, serialize } from "superjson";
import { proxy, ref, useSnapshot } from "valtio";
import axios, { CancelToken } from "./axios";
import { isBrowser, sleep } from "..";
import socket from "@italodeandra/next/socket";

const { setTimeout, clearTimeout } = isBrowser ? window : ({} as typeof window);

type OnQuery<
  Data extends unknown = unknown,
  Params extends Record<string, unknown> = Record<string, unknown>,
  Context extends Record<string, unknown> = Record<string, unknown>
> = (
  params: Params,
  state: QueryProxyState<Data, Params>,
  context: Context
) => Promise<Context | void> | Context | void;
type OnSuccess<
  Data extends unknown = unknown,
  Params extends Record<string, unknown> = Record<string, unknown>,
  Context extends Record<string, unknown> = Record<string, unknown>
> = (
  data: Data,
  params: Params,
  state: QueryProxyState<Data, Params>,
  context: Context
) => Promise<Context | void> | Context | void;
type OnError<
  Data extends unknown = unknown,
  Params extends Record<string, unknown> = Record<string, unknown>,
  Context extends Record<string, unknown> = Record<string, unknown>
> = (
  error: AxiosError,
  params: Params,
  state: QueryProxyState<Data, Params>,
  context: Context
) => Promise<Context | void> | Context | void;
type OnSettled<
  Data extends unknown = unknown,
  Params extends Record<string, unknown> = Record<string, unknown>,
  Context extends Record<string, unknown> = Record<string, unknown>
> = (
  data: Data | undefined,
  error: AxiosError | null,
  params: Params,
  state: QueryProxyState<Data, Params>,
  context: Context
) => Promise<Context | void> | Context | void;

interface Options<
  Data extends unknown = unknown,
  Params extends Record<string, unknown> = Record<string, unknown>
> {
  initialData?: Data;
  initialParams?: Params;
  onQuery?: OnQuery<Data, Params>;
  onSuccess?: OnSuccess<Data, Params>;
  onError?: OnError<Data, Params>;
  onSettled?: OnSettled<Data, Params>;
  /**
   * It's POST by default.
   */
  method?: "get";
}

interface QueryProxyState<
  Data extends unknown = unknown,
  Params extends Record<string, unknown> = Record<string, unknown>
> {
  params: Params;
  debouncedParams: Params;
  debouncedParamsTimer: number | undefined;
  data: Data | undefined;
  dataPromise: { promise: Promise<void> | null };
  cancelTokenSource: CancelTokenSource | null;
  isLoading: boolean;
  isSuccess: boolean | null;
  debouncedIsLoading: boolean;
  debouncedIsLoadingTimer: number | undefined;
  error: AxiosError | null;
  wasQueriedOnce: boolean;
  activeAutoQuery: {
    onWindowFocus: number;
    socketEvent: string[];
  };

  setParams(params: Partial<Params>, clear?: boolean): void;

  query(
    params?: Partial<Params>,
    options?: {
      onQuery?: OnQuery<Data, Params>;
      onSuccess?: OnSuccess<Data, Params>;
      onError?: OnError<Data, Params>;
      onSettled?: OnSettled<Data, Params>;
    }
  ): Promise<Data | undefined>;

  letAutoQueryOnceMore(): void;

  cancel(message: string): void;

  setLoading(value: boolean): void;

  reset(): void;
}

interface QueryProxy<
  Data extends unknown = unknown,
  Params extends Record<string, unknown> = Record<string, unknown>
> {
  states: {
    [key: string]: QueryProxyState<Data, Params>;
  };

  createState(id: string, noCache?: boolean): QueryProxyState<Data, Params>;
}

const queryProxy = <
  Data extends unknown = unknown,
  Params extends Record<string, unknown> = Record<string, unknown>
>(
  urlOrFn:
    | string
    | ((params: Params, state: QueryProxyState<Data, Params>) => Promise<Data>),
  options?: Options<Data, Params>
): QueryProxy<Data, Params> => {
  const initialData = options?.initialData;
  const initialParams = options?.initialParams;
  const method = options?.method || ("post" as const);

  const createState = (): QueryProxyState<Data, Params> => {
    const defaultObject: QueryProxyState<Data, Params> = {
      wasQueriedOnce: false,
      activeAutoQuery: {
        onWindowFocus: 0,
        socketEvent: [],
      },
      params: { ...initialParams } as Params,
      debouncedParams: { ...initialParams } as Params,
      debouncedParamsTimer: undefined,
      setParams(params, clear) {
        if (clear) {
          Object.keys(state.debouncedParams).forEach((key) => {
            delete state.debouncedParams[key];
          });
          Object.keys(state.params).forEach((key) => {
            delete state.params[key];
          });
        }
        clearTimeout(state.debouncedParamsTimer);
        state.debouncedParamsTimer = setTimeout(() => {
          Object.assign(state.debouncedParams, params);
        }, 400);
        Object.assign(state.params, params);
      },
      data: initialData,
      dataPromise: ref<QueryProxyState<Data, Params>["dataPromise"]>({
        promise: null,
      }),
      cancelTokenSource: null,
      query: async (params, queryOptions) => {
        state.wasQueriedOnce = true;
        if (params) {
          state.setParams(params);
        }
        const { setLoading } = state;
        try {
          state.cancel("Operation canceled by a new query");
          await sleep(1);
          setLoading(true);
          state.isSuccess = null;
          let context: Record<string, unknown> = {};
          context =
            (await options?.onQuery?.(state.params, state, context)) || context;
          context =
            (await queryOptions?.onQuery?.(state.params, state, context)) ||
            context;
          state.error = null;
          state.cancelTokenSource = CancelToken.source();
          state.dataPromise.promise = (
            typeof urlOrFn === "string"
              ? axios
                  .request({
                    url: urlOrFn,
                    method: method,
                    cancelToken: state.cancelTokenSource.token,
                    ...(method === "post"
                      ? {
                          data: serialize(state.params),
                        }
                      : {
                          params: serialize(state.params),
                        }),
                  })
                  .then((res) => res.data)
              : urlOrFn(state.params, state)
          )
            .then(async (data) => {
              state.data = (deserialize(data) || data) as Data;
              try {
                context =
                  (await options?.onSuccess?.(
                    state.data,
                    state.params,
                    state,
                    context
                  )) || context;
                context =
                  (await queryOptions?.onSuccess?.(
                    state.data,
                    state.params,
                    state,
                    context
                  )) || context;
              } catch (e) {
                console.error(e);
              }
              state.isSuccess = true;
            })
            .catch(async (error) => {
              console.error(error);
              state.error = error;
              state.setParams(initialParams || {}, true);
              try {
                context =
                  (await options?.onError?.(
                    error,
                    state.params,
                    state,
                    context
                  )) || context;
                context =
                  (await queryOptions?.onError?.(
                    error,
                    state.params,
                    state,
                    context
                  )) || context;
              } catch (e) {
                console.error(e);
              }
              state.isSuccess = false;
            })
            .finally(async () => {
              state.cancelTokenSource = null;
              state.dataPromise.promise = null;
              setLoading(false);
              try {
                context =
                  (await options?.onSettled?.(
                    state.data,
                    state.error,
                    state.params,
                    state,
                    context
                  )) || context;
                context =
                  (await queryOptions?.onSettled?.(
                    state.data,
                    state.error,
                    state.params,
                    state,
                    context
                  )) || context;
              } catch (e) {
                console.error(e);
              }
            });
          await state.dataPromise.promise;
        } catch (error) {
          console.error(error);
          state.error = error;
        }
        return state.data;
      },
      cancel(message) {
        state.cancelTokenSource?.cancel(message);
        state.dataPromise.promise = null;
        state.cancelTokenSource = null;
      },
      isLoading: false,
      isSuccess: null,
      debouncedIsLoading: false,
      debouncedIsLoadingTimer: undefined,
      setLoading(value) {
        clearTimeout(state.debouncedIsLoadingTimer);
        if (value) {
          state.isLoading = value;
          state.debouncedIsLoadingTimer = setTimeout(() => {
            state.debouncedIsLoading = value;
          }, 400);
        } else {
          state.isLoading = value;
          state.debouncedIsLoading = value;
        }
      },
      error: null,
      reset() {
        Object.assign(state, defaultObject);
      },
      letAutoQueryOnceMore(): void {
        state.wasQueriedOnce = false;
      },
    };
    const state: QueryProxyState<Data, Params> = proxy(defaultObject);
    return state;
  };

  const queriesState = proxy<QueryProxy<Data, Params>>({
    states: {} as {
      [key: string]: ReturnType<typeof createState>;
    },
    createState(id: string, noCache?: boolean) {
      const state = createState();
      if (!noCache) {
        queriesState.states[id] = state;
      }
      return state;
    },
  });

  return queriesState;
};

export default queryProxy;

interface AutoQuery {
  onMount?: boolean | "once";
  onParamsUpdate?: boolean;
  onWindowFocus?: boolean;
  socketEvent?: string;
}

export const useQuerySnapshot = <
  T extends QueryProxy,
  Data extends T["states"][string]["data"] = T["states"][string]["data"],
  Params extends T["states"][string]["params"] = T["states"][string]["params"]
>(
  proxyObject: T,
  options?: {
    id?: string | number | ObjectId;
    noCache?: boolean;
    sync?: boolean;
    autoQuery?: AutoQuery;
    initialData?: Data;
    params?: Params;
    onQuery?: OnQuery<Data, Params>;
    onSuccess?: OnSuccess<Data, Params>;
    onError?: OnError<Data, Params>;
    onSettled?: OnSettled<Data, Params>;
  }
): T["states"][string] => {
  const id = (options?.id || 0).toString();
  const autoQuery = options?.autoQuery;
  const noCache = options?.noCache;
  const indexState = useMemo(
    () => proxyObject.states[id] || proxyObject.createState(id, noCache),
    [proxyObject, id, noCache]
  );
  const stateSnapshot = useSnapshot(indexState, options);

  const query: typeof stateSnapshot.query = useCallback(
    (params, replaceOptions) =>
      stateSnapshot.query(params, {
        ...options,
        ...replaceOptions,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stateSnapshot.query]
  );

  const initialData = options?.initialData;
  useEffect(() => {
    if (initialData) {
      indexState.data = initialData;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexState]);

  const params = options?.params;
  useDeepCompareEffect(() => {
    if (params) {
      indexState.params = params;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const { debouncedParams } = stateSnapshot;
  const onParamsUpdate = autoQuery?.onParamsUpdate;
  useUpdateEffect(() => {
    if (onParamsUpdate) {
      void query();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParams, onParamsUpdate]);

  let onMount = autoQuery?.onMount;
  useEffect(() => {
    if (onMount === "once") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      onMount = !indexState.wasQueriedOnce;
    }
    if (onMount) {
      void query();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexState, onMount, indexState.wasQueriedOnce]);

  const onWindowFocus = autoQuery?.onWindowFocus;
  useEffect(() => {
    if (onWindowFocus) {
      indexState.activeAutoQuery.onWindowFocus =
        indexState.activeAutoQuery.onWindowFocus + 1;
      const isFirst = indexState.activeAutoQuery.onWindowFocus === 1;
      const handleFocus = (): void => {
        void query();
      };
      if (isFirst) {
        window.addEventListener("focus", handleFocus);
      }
      return () => {
        indexState.activeAutoQuery.onWindowFocus =
          indexState.activeAutoQuery.onWindowFocus - 1;
        if (indexState.activeAutoQuery.onWindowFocus <= 0) {
          window.removeEventListener("focus", handleFocus);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexState, onWindowFocus]);

  const socketEvent = autoQuery?.socketEvent;
  useEffect(() => {
    if (socketEvent) {
      const isFirst =
        !indexState.activeAutoQuery.socketEvent.includes(socketEvent);
      indexState.activeAutoQuery.socketEvent.push(socketEvent);
      if (isFirst) {
        socket.on(socketEvent, query);
      }
      return () => {
        indexState.activeAutoQuery.socketEvent.splice(
          indexState.activeAutoQuery.socketEvent.indexOf(socketEvent),
          1
        );
        if (!indexState.activeAutoQuery.socketEvent.includes(socketEvent)) {
          socket.off(socketEvent, query);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexState, socketEvent]);

  return {
    ...stateSnapshot,
    query,
  } as unknown as T["states"][string];
};

export const getState = <
  Data extends unknown,
  Params extends Record<string, unknown>
>(
  proxyObject: QueryProxy<Data, Params>,
  id?: string | number | ObjectId
): QueryProxyState<Data, Params> | undefined => {
  id = (id || 0).toString();
  return proxyObject.states[id];
};

export const useHydrate = <
  Data extends unknown,
  Params extends Record<string, unknown>,
  T extends QueryProxy<Data, Params>
>(
  proxyObject: T,
  initialData: Data,
  id?: string | number | Record<string, unknown>
): void => {
  const ref = useRef(false);
  if (!ref.current) {
    const idString = (id || 0).toString();
    const indexState =
      proxyObject.states[idString] || proxyObject.createState(idString);
    indexState.data = initialData;
    indexState.wasQueriedOnce = true;
    ref.current = true;
  }
};

export const AUTOQUERY_ONMOUNTONCE = {
  autoQuery: {
    onMount: "once",
  },
} as const;
export const AUTOQUERY_ONMOUNTONCE_ONWINDOWFOCUS = {
  autoQuery: {
    onMount: "once",
    onWindowFocus: true,
  },
} as const;
export const AUTOQUERY_ONMOUNT_ONWINDOWFOCUS = {
  autoQuery: {
    onMount: true,
    onWindowFocus: true,
  },
} as const;
