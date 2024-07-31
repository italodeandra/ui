import { ObjectId } from "bson";
export type Querify<T> = T extends ObjectId ? string : T extends null ? "null" : T extends number | boolean | Array<any> ? string : T extends object ? {
    [k in keyof T]: Querify<T[k]>;
} : T;
export default function querify<T>(object: T): Querify<T>;
