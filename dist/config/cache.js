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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const async_redis_1 = __importDefault(require("async-redis"));
const config_1 = require("config");
exports.redisClient = async_redis_1.default.createClient({
    url: config_1.config.redis_url,
});
const connectCache = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.redisClient.on('error', function (error) {
        console.log('Error ' + error);
    });
});
exports.default = connectCache;
//# sourceMappingURL=cache.js.map