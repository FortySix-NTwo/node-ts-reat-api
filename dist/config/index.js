"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.configLogger = exports.configORM = exports.configCache = exports.config = void 0;
var config_1 = require("./config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return __importDefault(config_1).default; } });
var configCache_1 = require("./configCache");
Object.defineProperty(exports, "configCache", { enumerable: true, get: function () { return __importDefault(configCache_1).default; } });
var configORM_1 = require("./configORM");
Object.defineProperty(exports, "configORM", { enumerable: true, get: function () { return __importDefault(configORM_1).default; } });
var configLogger_1 = require("./configLogger");
Object.defineProperty(exports, "configLogger", { enumerable: true, get: function () { return __importDefault(configLogger_1).default; } });
var configCache_2 = require("./configCache");
Object.defineProperty(exports, "redisClient", { enumerable: true, get: function () { return configCache_2.redisClient; } });
//# sourceMappingURL=index.js.map