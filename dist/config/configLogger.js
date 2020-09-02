"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_transport_sentry_node_1 = __importDefault(require("winston-transport-sentry-node"));
const SentryNode = __importStar(require("@sentry/node"));
const index_1 = require("./index");
const { sentry_dsn } = index_1.config;
const logger = () => {
    SentryNode.init({ dsn: sentry_dsn });
    const logger = winston_1.default.createLogger({
        format: winston_1.default.format.combine(winston_1.default.format.prettyPrint(), winston_1.default.format.simple(), winston_1.default.format.label()),
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
    return logger;
};
exports.appLogger = logger();
//# sourceMappingURL=configLogger.js.map