"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_transport_sentry_node_1 = __importDefault(require("winston-transport-sentry-node"));
const _1 = require(".");
const { sentry_dsn } = _1.config;
exports.configLogger = () => {
    const appLogger = winston_1.default.createLogger({
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
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
    return appLogger;
};
//# sourceMappingURL=configLogger.js.map