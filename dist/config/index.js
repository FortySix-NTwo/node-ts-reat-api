"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.appLogger = exports.configApp = exports.configRouterMiddleware = exports.configServerMiddleware = exports.configDB = exports.config = void 0;
var config_1 = require("./config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return __importDefault(config_1).default; } });
var configDatabase_1 = require("./configDatabase");
Object.defineProperty(exports, "configDB", { enumerable: true, get: function () { return configDatabase_1.configDB; } });
var configServerMiddleware_1 = require("./configServerMiddleware");
Object.defineProperty(exports, "configServerMiddleware", { enumerable: true, get: function () { return configServerMiddleware_1.configServerMiddleware; } });
var configRouterMiddleware_1 = require("./configRouterMiddleware");
Object.defineProperty(exports, "configRouterMiddleware", { enumerable: true, get: function () { return configRouterMiddleware_1.configRouterMiddleware; } });
var configApp_1 = require("./configApp");
Object.defineProperty(exports, "configApp", { enumerable: true, get: function () { return configApp_1.configApp; } });
var configLogger_1 = require("./configLogger");
Object.defineProperty(exports, "appLogger", { enumerable: true, get: function () { return configLogger_1.appLogger; } });
var configCache_1 = require("./configCache");
Object.defineProperty(exports, "redisClient", { enumerable: true, get: function () { return configCache_1.redisClient; } });
//# sourceMappingURL=index.js.map