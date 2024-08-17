import { isNil } from "lodash-es";
export default function removeEmptyProperties(doc) {
    const $unset = {};
    for (const key in doc) {
        const property = key;
        if (isNil(doc[property]) || doc[property] === "") {
            $unset[property] = "";
            delete doc[property];
        }
    }
    return $unset;
}
