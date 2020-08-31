"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = exports.host = exports.port = exports.configMiddleware = void 0;
const express_async_router_1 = require("express-async-router");
const _1 = require(".");
const utils_1 = require("../utils");
const middleware_1 = require("../middleware");
const router = express_async_router_1.AsyncRouter();
const port = _1.config.port;
exports.port = port;
const host = _1.config.host;
exports.host = host;
const environment = _1.config.environment;
exports.environment = environment;
const configMiddleware = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        utils_1.registerMiddleware(middleware_1.middleware, router);
        utils_1.registerMiddleware(middleware_1.HandleError, router);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.configMiddleware = configMiddleware;
//# sourceMappingURL=configServer.js.map