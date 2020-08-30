"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_transport_sentry_node_1 = __importDefault(require("winston-transport-sentry-node"));
const config_1 = require("../config");
const sentry_dsn = config_1.config.sentry_dsn;
const configLogger = winston_1.default.createLogger({
    level: 'debug',
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console({ handleExceptions: true }),
        new winston_transport_sentry_node_1.default({
            sentry: {
                dsn: sentry_dsn,
            },
            handleExceptions: true,
        }),
    ],
});
exports.default = configLogger;
//# sourceMappingURL=configLogger.js.map