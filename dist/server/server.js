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
require("express-async-errors");
const config_1 = require("../config");
const server = express_1.default();
const appLogger = config_1.configLogger();
const { port, host, environment } = config_1.config;
class Server {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.configMiddleware(server);
                yield config_1.configDB();
                appLogger.info(`Database Connected`);
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
            }
            appLogger.error(`Internal Server Error ${error}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map