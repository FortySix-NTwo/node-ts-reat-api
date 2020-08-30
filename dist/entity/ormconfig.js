"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const ormConfig = {
    type: 'postgres',
    host: config_1.config.pg_host,
    port: config_1.config.pg_port,
    username: config_1.config.pg_user,
    password: config_1.config.pg_pass,
    database: config_1.config.pg_db,
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
exports.default = ormConfig;
//# sourceMappingURL=ormconfig.js.map