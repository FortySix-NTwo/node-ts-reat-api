"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.routingErrors = exports.swaggerDocs = void 0;
var apiDocs_1 = require("./apiDocs");
Object.defineProperty(exports, "swaggerDocs", { enumerable: true, get: function () { return __importDefault(apiDocs_1).default; } });
var routingErrors_1 = require("./routingErrors");
Object.defineProperty(exports, "routingErrors", { enumerable: true, get: function () { return __importDefault(routingErrors_1).default; } });
var middleware_1 = require("./middleware");
Object.defineProperty(exports, "middleware", { enumerable: true, get: function () { return __importDefault(middleware_1).default; } });
//# sourceMappingURL=index.js.map