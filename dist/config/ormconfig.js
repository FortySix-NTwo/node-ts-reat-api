"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const configORM = {
    type: 'postgres',
    host: _1.config.pg_host,
    port: _1.config.pg_port,
    username: _1.config.pg_user,
    password: _1.config.pg_pass,
    database: _1.config.pg_db,
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
exports.default = configORM;
//# sourceMappingURL=ormconfig.js.map