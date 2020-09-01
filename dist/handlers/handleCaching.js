"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const utils_1 = require("utils");
const entity_1 = require("../entity");
const handleCaching = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.params || req.body || req.query;
        const key = req.params.key || req.body.key || req.query.key;
        if (!key) {
            throw new utils_1.HTTP400Error();
        }
        const result = config_1.asyncClient.get(key);
        if (!result) {
            entity_1.compareQuery(query, key);
        }
        res.status(200).send(result);
    }
    catch (error) {
        next();
    }
});
exports.default = [handleCaching];
//# sourceMappingURL=handleCaching.js.map