"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const winston_transport_sentry_node_1 = __importDefault(require("winston-transport-sentry-node"));
const config_1 = require("../config");
const sentry_dsn = config_1.config.sentry_dsn;
const RateLimit = (router) => {
    const limit = express_rate_limit_1.default({
        max: 100,
        windowMs: 30 * 60 * 1000,
        message: `Request Limit per has been reached`,
    });
    router.use(limit);
};
const JSONParsing = (router) => {
    router.use(express_1.default.json({ limit: '10kb' }));
};
const BodyParsing = (router) => {
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
};
const HTTPHeaders = (router) => router.use(helmet_1.default());
const Cors = (router) => router.use(cors_1.default({ credentials: true, origin: true }));
const Compression = (router) => {
    router.use(compression_1.default());
};
const Logger = (router) => router.use(express_winston_1.default.logger({
    msg: 'HTTP {{req.method}} {{req.url}}',
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
}));
const SwaggerDocs = (router) => router.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup());
exports.default = [
    RateLimit,
    JSONParsing,
    BodyParsing,
    HTTPHeaders,
    Cors,
    Compression,
    SwaggerDocs,
    Logger,
];
//# sourceMappingURL=middleware.js.map