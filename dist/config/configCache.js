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
exports.redisClient = void 0;
const index_1 = require("./index");
const connectToRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield index_1.configRedis();
        return client;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.redisClient = connectToRedis();
//# sourceMappingURL=configCache.js.map