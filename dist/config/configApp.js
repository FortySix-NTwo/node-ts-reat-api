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
exports.configApp = void 0;
require("express-async-errors");
const index_1 = require("./index");
const { port, host, environment } = index_1.config;
exports.configApp = (server, router) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        process.on('uncaughtException', (error) => {
            index_1.appLogger.error({
                message: `uncaught Exception`,
                extra: error,
            });
            process.exit(1);
        });
        process.on('unhandledRejection', (error) => {
            index_1.appLogger.error({
                message: `unhandled Rejection`,
                extra: error,
            });
            process.exit(1);
        });
        yield index_1.configDB();
        yield index_1.configServerMiddleware(server);
        yield index_1.configRouterMiddleware(router);
        server.use(router);
        server.listen(port, host, () => {
            index_1.appLogger.info(`Server Running at http://${host}:${port}`);
        });
        return server;
    }
    catch (error) {
        if (environment === 'development') {
            index_1.appLogger.error(`Internal Server Error ${error.stack}`);
            process.exit(1);
        }
        index_1.appLogger.error(`Internal Server Error ${error}`);
        process.exit(1);
    }
});
//# sourceMappingURL=configApp.js.map