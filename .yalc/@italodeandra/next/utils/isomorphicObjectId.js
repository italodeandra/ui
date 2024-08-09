const isServer = typeof window === "undefined";
import BrowserObjectId from "bson-objectid";
import { ObjectId as ServerObjectId } from "bson";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isomorphicObjectId(inputId) {
    if (isServer) {
        return new ServerObjectId(inputId);
    }
    else {
        return new BrowserObjectId(inputId);
    }
}
