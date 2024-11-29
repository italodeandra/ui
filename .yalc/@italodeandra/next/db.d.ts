import { Db, MongoClient } from "mongodb";
import Papr from "papr";
export declare function connectDb(afterConnected?: ((db: Db) => Promise<void>)[]): Promise<Papr | undefined>;
export declare function clearPromise(): void;
declare const _default: Papr;
export default _default;
export declare function getMongoClient(): MongoClient;
