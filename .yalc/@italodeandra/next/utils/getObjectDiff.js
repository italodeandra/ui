"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function getObjectDiff(object1, object2) {
    // Find the keys that have different values in the two objects
    var differingKeys = (0, lodash_1.difference)((0, lodash_1.keys)(object2), (0, lodash_1.keys)((0, lodash_1.pickBy)(object1, function (value, key) {
        return (0, lodash_1.isEqual)(value, object2[key]);
    })));
    return (0, lodash_1.pick)(object2, differingKeys);
}
exports.default = getObjectDiff;
