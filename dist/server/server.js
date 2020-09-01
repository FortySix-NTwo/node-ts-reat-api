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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_router_1 = require("express-async-router");
require("express-async-errors");
const config_1 = require("../config");
const server = express_1.default();
const router = express_async_router_1.AsyncRouter();
const appLogger = config_1.configLogger();
const { port, host, environment } = config_1.config;
class Server {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.configApp(server, router);
                yield config_1.configDB();
                server.listen(port, host, () => {
                    appLogger.info(`Server Running at http://${host}:${port}`);
                });
            }
            catch (error) {
                this.stop(error);
            }
        });
    }
    stop(error) {
        return __awaiter(this, void 0, void 0, function* () {
            if (environment === 'development') {
                appLogger.error(`Internal Server Error ${error.stack}`);
                process.exit(1);
            }
            appLogger.error(`Internal Server Error ${error}`);
            process.exit(1);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map