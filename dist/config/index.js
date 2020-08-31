"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configRoutes = exports.configMiddleware = exports.redisClient = exports.configDB = exports.configLogger = exports.config = void 0;
var config_1 = require("./config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return __importDefault(config_1).default; } });
var configLogger_1 = require("./configLogger");
Object.defineProperty(exports, "configLogger", { enumerable: true, get: function () { return configLogger_1.configLogger; } });
var configORM_1 = require("./configORM");
Object.defineProperty(exports, "configDB", { enumerable: true, get: function () { return configORM_1.configDB; } });
var configCache_1 = require("./configCache");
Object.defineProperty(exports, "redisClient", { enumerable: true, get: function () { return configCache_1.redisClient; } });
var configMiddleware_1 = require("./configMiddleware");
Object.defineProperty(exports, "configMiddleware", { enumerable: true, get: function () { return configMiddleware_1.configMiddleware; } });
var configRoutes_1 = require("./configRoutes");
Object.defineProperty(exports, "configRoutes", { enumerable: true, get: function () { return configRoutes_1.configRoutes; } });
//# sourceMappingURL=index.js.map