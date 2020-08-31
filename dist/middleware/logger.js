"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const config_1 = require("../config");
const sentry_dsn = config_1.config.sentry_dsn;
const routeLogger = (server) => server.use(express_winston_1.default.logger({
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [new winston_1.default.transports.Console({ handleExceptions: true })],
}));
exports.default = [routeLogger];
//# sourceMappingURL=logger.js.map