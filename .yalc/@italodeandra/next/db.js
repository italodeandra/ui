import { MongoClient } from "mongodb";
import Papr from "papr";
import { isServer, onlyServer } from "./utils/isServer";
let uri = process.env.MONGODB_URI;
const appEnv = process.env.APP_ENV;
const options = {};
const _global = (onlyServer(() => global) || {});
if (isServer) {
    _global._papr = _global._papr || new Papr();
}
// noinspection JSUnusedGlobalSymbols
export async function connectDb(afterConnected) {
    if (_global._dbPromise) {
        return _global._dbPromise;
    }
    const connect = async () => {
        if (!uri && appEnv !== "production") {
            const { MongoMemoryServer } = await import("mongodb-memory-server");
            const dbName = process.env.MONGODB_MEMORY_SERVER_DBNAME;
            const mongod = await MongoMemoryServer.create({
                instance: {
                    port: 5432,
                    dbName,
                },
            });
            uri = mongod.getUri(dbName);
        }
        if (!uri) {
            throw Error("[MongoDB] URI not found");
        }
        _global._mongoClient = new MongoClient(uri, options);
        await _global._mongoClient.connect();
        _global._papr.initialize(_global._mongoClient.db());
        await _global._papr.updateSchemas();
        if (afterConnected) {
            for (const runAfterConnected of afterConnected) {
                await runAfterConnected(_global._mongoClient.db());
            }
        }
        console.info(`[MongoDB] Connected to "${uri}"`);
        return _global._papr;
    };
    _global._dbPromise = connect();
    await _global._dbPromise;
}
// noinspection JSUnusedGlobalSymbols
export function clearPromise() {
    delete _global._dbPromise;
}
export default _global._papr;
export function getMongoClient() {
    return _global._mongoClient;
}
