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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const config_1 = require("../config");
class Server {
    constructor() {
        this.setupServer = () => {
            const server = express_1.default();
            const environment = config_1.config.environment;
            const port = config_1.config.port;
            const host = config_1.config.host;
            return { server, environment, port, host };
        };
        this.setupServer();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield typeorm_1.createConnection(entity_1.ormConfig);
                console.info('Database Running');
                this.setupServer().server.listen(this.setupServer().port, this.setupServer().host, () => {
                    console.info(`Server running`);
                    return this.setupServer().server;
                });
            }
            catch (error) {
                this.stop(error);
            }
        });
    }
    stop(error) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.setupServer().environment === 'development') {
                console.error(`Internal Server Error ${error.stack}`);
                process.exit(1);
            }
            console.error(`Internal Server Error ${error}`);
            process.exit(1);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map