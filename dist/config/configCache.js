"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const index_1 = require("./index");
const { redis_url } = index_1.config;
const configCache = () => {
    const client = new ioredis_1.default(redis_url);
    index_1.appLogger.info(`Redis-Cache connected`);
    return client;
};
exports.redisClient = configCache();
//# sourceMappingURL=configCache.js.map