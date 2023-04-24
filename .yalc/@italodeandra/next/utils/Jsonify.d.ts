import { ObjectId } from "bson";
declare type Jsonify<T> = T extends {
    toJSON(): infer U;
} ? U : T extends ObjectId ? string : T extends object ? {
    [k in keyof T]: Jsonify<T[k]>;
} : T;
export default Jsonify;
