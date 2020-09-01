"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuthorization = exports.handleCaching = exports.healthCheck = void 0;
var healthCheck_1 = require("./healthCheck");
Object.defineProperty(exports, "healthCheck", { enumerable: true, get: function () { return __importDefault(healthCheck_1).default; } });
var handlers_1 = require("./handlers");
Object.defineProperty(exports, "handleCaching", { enumerable: true, get: function () { return handlers_1.handleCaching; } });
Object.defineProperty(exports, "handleAuthorization", { enumerable: true, get: function () { return handlers_1.handleAuthorization; } });
//# sourceMappingURL=index.js.map