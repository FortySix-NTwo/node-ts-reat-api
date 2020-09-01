"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.configMiddleware = void 0;
const Sentry = __importStar(require("@sentry/node"));
const index_1 = require("./index");
const utils_1 = require("../utils");
const { sentry_dsn, environment } = index_1.config;
const middleware_1 = require("../middleware");
exports.configMiddleware = (router) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        utils_1.registerRouterMiddleware(middleware_1.swaggerDocs, router);
        utils_1.registerRouterMiddleware(middleware_1.routingErrors, router);
        Sentry.init({ dsn: sentry_dsn });
    }
    catch (error) {
        if (environment === 'development') {
            Sentry.captureException(error);
        }
        throw new Error(error);
    }
});
//# sourceMappingURL=configRouterMiddlewar.js.map