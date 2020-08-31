"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareQuery = void 0;
function compareQuery(query, el) {
    return Object.keys(query).every((key) => query[key] === el[key]);
}
exports.compareQuery = compareQuery;
//# sourceMappingURL=repository.js.map