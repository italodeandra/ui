import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { AsyncReturnType } from "type-fest";
import { AsyncFunction } from "type-fest/source/async-return-type";
import Jsonify from "../utils/Jsonify";
export declare const apiHandlerWrapper: (handler: (args: any, req: NextApiRequest, res: NextApiResponse) => any) => NextApiHandler<any>;
export declare type InferApiArgs<T extends (...args: any) => any> = Parameters<T>[0];
export declare type InferApiResponse<T extends (...args: any[]) => Promise<unknown> | unknown> = Jsonify<T extends AsyncFunction ? AsyncReturnType<T> : ReturnType<T>>;
export declare const queryFnWrapper: <TQueryFnData = any, TArgs = any>(queryKey: string, args?: TArgs | undefined) => (reactQuerySignal?: any) => Promise<Jsonify<TQueryFnData>>;
export declare const mutationFnWrapper: <TArgs = any, TMutationFnData = any>(mutationKey: string) => (args: TArgs) => Promise<Jsonify<TMutationFnData>>;
