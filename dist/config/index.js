"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectCache = exports.redisClient = exports.config = void 0;
var config_1 = require("./config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return __importDefault(config_1).default; } });
var cache_1 = require("./cache");
Object.defineProperty(exports, "redisClient", { enumerable: true, get: function () { return cache_1.redisClient; } });
var cache_2 = require("./cache");
Object.defineProperty(exports, "connectCache", { enumerable: true, get: function () { return __importDefault(cache_2).default; } });
//# sourceMappingURL=index.js.map