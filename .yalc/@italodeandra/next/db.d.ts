import { Db, MongoClient } from "mongodb";
import Papr from "papr";
export declare let client: MongoClient;
declare const papr: Papr;
export declare function connectDb(afterConnected?: ((db: Db) => Promise<void>)[]): Promise<void>;
export declare function clearPromise(): void;
export default papr;
