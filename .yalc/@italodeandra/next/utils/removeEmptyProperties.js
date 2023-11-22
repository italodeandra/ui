"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function removeEmptyProperties(doc) {
    var $unset = {};
    for (var key in doc) {
        var property = key;
        if ((0, lodash_1.isNil)(doc[property]) || doc[property] === "") {
            $unset[property] = "";
            delete doc[property];
        }
    }
    return $unset;
}
exports.default = removeEmptyProperties;
