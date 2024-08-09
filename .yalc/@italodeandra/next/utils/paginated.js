"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function paginated(array, page, perPage) {
    return array.slice(page * perPage, (page + 1) * perPage);
}
exports.default = paginated;
