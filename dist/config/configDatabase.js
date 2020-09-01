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
exports.configDB = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const index_1 = require("./index");
const { pg_host, pg_port, pg_user, pg_pass, pg_db } = index_1.config;
const configORM = {
    type: 'postgres',
    host: pg_host,
    port: pg_port,
    username: pg_user,
    password: pg_pass,
    database: pg_db,
    entities: [__dirname + 'entity/model/**/*{.ts,.js}'],
    migrationsRun: true,
    synchronize: true,
    logging: true,
    logger: 'file',
    migrations: [__dirname + 'entity/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/entity/migrations',
    },
};
exports.configDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection(configORM);
    }
    catch (error) {
        throw new Error(error);
    }
});
//# sourceMappingURL=configDatabase.js.map