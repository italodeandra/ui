import { isEqual } from "lodash-es";
import getObjectDiff from "./getObjectDiff";
export default function getArrayDiff(array1, array2, by) {
    const instructions = [];
    const array1Map = new Map(array1.map((item) => [item[by], item]));
    const array2Map = new Map(array2.map((item) => [item[by], item]));
    const keys1 = new Set(array1.map((item) => item[by]));
    const keys2 = new Set(array2.map((item) => item[by]));
    const allKeys = new Set([...Array.from(keys1), ...Array.from(keys2)]);
    for (const key of Array.from(allKeys)) {
        const diff = getObjectDiff(array1Map.get(key) || {}, array2Map.get(key) || {});
        if (!keys1.has(key)) {
            instructions.push({
                type: "inserted",
                before: array1Map.get(key),
                after: array2Map.get(key),
                diff,
            });
        }
        else if (!keys2.has(key)) {
            instructions.push({
                type: "deleted",
                before: array1Map.get(key),
                after: array2Map.get(key),
                diff,
            });
        }
        else if (!isEqual(array1Map.get(key), array2Map.get(key))) {
            instructions.push({
                type: "updated",
                before: array1Map.get(key),
                after: array2Map.get(key),
                diff,
            });
        }
    }
    return instructions;
}
