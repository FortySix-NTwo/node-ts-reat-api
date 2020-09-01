"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncClient = void 0;
const async_redis_1 = __importDefault(require("async-redis"));
const redis_1 = __importDefault(require("redis"));
const index_1 = require("./index");
const { redis_url } = index_1.config;
const client = redis_1.default.createClient({
    url: redis_url,
});
const configRedis = () => {
    client.on('error', (error) => {
        if (error) {
            throw new Error(`error : ${error}`);
        }
    });
};
exports.asyncClient = async_redis_1.default.decorate(client);
exports.default = [configRedis];
//# sourceMappingURL=configRedis.js.map