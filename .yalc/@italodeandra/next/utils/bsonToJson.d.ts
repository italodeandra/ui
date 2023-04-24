import Jsonify from "./Jsonify";
export default function bsonToJson<T>(value: T): T | Jsonify<T> | undefined;
