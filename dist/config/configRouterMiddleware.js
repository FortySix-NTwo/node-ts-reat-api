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
exports.configRouterMiddleware = void 0;
const utils_1 = require("../utils");
const middleware_1 = require("../middleware");
const routes_1 = require("../routes");
exports.configRouterMiddleware = (router) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        utils_1.registerRouterMiddleware(routes_1.healthCheck, router);
        utils_1.registerRouterMiddleware(middleware_1.swaggerDocs, router);
        utils_1.registerRouterMiddleware(middleware_1.routingErrors, router);
    }
    catch (error) {
        throw new Error(error);
    }
});
//# sourceMappingURL=configRouterMiddleware.js.map