import { difference, isEqual, keys, pick, pickBy } from "lodash-es";
export default function getObjectDiff(object1, object2) {
    // Find the keys that have different values in the two objects
    const differingKeys = difference(keys(object2), keys(pickBy(object1, (value, key) => isEqual(value, object2[key]))));
    return pick(object2, differingKeys);
}
