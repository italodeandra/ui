import BrowserObjectId from "bson-objectid";
import { ObjectId as ServerObjectId } from "mongodb";
export default function isomorphicObjectId(inputId?: any): ServerObjectId | BrowserObjectId;
