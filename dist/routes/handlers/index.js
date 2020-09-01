"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuthorization = exports.handleCaching = void 0;
var handleCaching_1 = require("./handleCaching");
Object.defineProperty(exports, "handleCaching", { enumerable: true, get: function () { return __importDefault(handleCaching_1).default; } });
var handleJWT_1 = require("./handleJWT");
Object.defineProperty(exports, "handleAuthorization", { enumerable: true, get: function () { return __importDefault(handleJWT_1).default; } });
//# sourceMappingURL=index.js.map