import { Collection, Db, MongoClient } from "mongodb";
declare type DatabaseConnect = {
    client: MongoClient;
    db: Db;
    uri: string;
};
declare global {
    var mongo: {
        conn: DatabaseConnect | null;
        promise: Promise<DatabaseConnect> | null;
        collections: Record<string, Collection<any>>;
    };
}
export default function connectToDatabase(): Promise<DatabaseConnect>;
export {};
