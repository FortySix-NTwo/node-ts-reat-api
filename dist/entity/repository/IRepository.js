"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareQuery = void 0;
function compareQuery(query, params) {
    return Object.keys(query).every((key) => query[key] === params[key]);
}
exports.compareQuery = compareQuery;
//# sourceMappingURL=IRepository.js.map