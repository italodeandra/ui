"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function removeEmptyProperties(doc) {
    const $unset = {};
    for (const key in doc) {
        const property = key;
        if ((0, lodash_1.isNil)(doc[property]) || doc[property] === "") {
            $unset[property] = "";
            delete doc[property];
        }
    }
    return $unset;
}
exports.default = removeEmptyProperties;
