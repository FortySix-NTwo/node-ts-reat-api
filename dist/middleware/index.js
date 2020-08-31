"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = exports.middleware = exports.handleAuthorization = exports.errorHandler = exports.cachedRoutes = void 0;
var cache_1 = require("./cache");
Object.defineProperty(exports, "cachedRoutes", { enumerable: true, get: function () { return __importDefault(cache_1).default; } });
var handleErrors_1 = require("./handleErrors");
Object.defineProperty(exports, "errorHandler", { enumerable: true, get: function () { return __importDefault(handleErrors_1).default; } });
var jwt_1 = require("./jwt");
Object.defineProperty(exports, "handleAuthorization", { enumerable: true, get: function () { return __importDefault(jwt_1).default; } });
var middleware_1 = require("./middleware");
Object.defineProperty(exports, "middleware", { enumerable: true, get: function () { return __importDefault(middleware_1).default; } });
var apiDocs_1 = require("./apiDocs");
Object.defineProperty(exports, "swaggerDocs", { enumerable: true, get: function () { return __importDefault(apiDocs_1).default; } });
//# sourceMappingURL=index.js.map