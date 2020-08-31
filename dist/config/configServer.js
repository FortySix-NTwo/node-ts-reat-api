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
exports.configServer = void 0;
const express_async_router_1 = require("express-async-router");
const typeorm_1 = require("typeorm");
const index_1 = require("./index");
const utils_1 = require("../utils");
const middleware_1 = require("../middleware");
const router = express_async_router_1.AsyncRouter();
exports.configServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        process.on('uncaughtException', (e) => {
            index_1.configLogger.error({
                message: `uncaughtException`,
                extra: e,
            });
            process.exit(1);
        });
        yield index_1.configCache();
        yield typeorm_1.createConnection(index_1.configORM);
        utils_1.registerMiddleware(middleware_1.middleware, router);
        utils_1.registerMiddleware(middleware_1.HandleError, router);
    }
    catch (error) {
        console.error(error);
    }
});
//# sourceMappingURL=configServer.js.map