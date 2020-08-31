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
const RateLimit = (server) => {
    const limit = express_rate_limit_1.default({
        max: 100,
        windowMs: 30 * 60 * 1000,
        message: `Request Limit per has been reached`,
    });
    server.use(limit);
};
const JSONParsing = (server) => {
    server.use(express_1.default.json({ limit: '10kb' }));
};
const BodyParsing = (server) => {
    server.use(express_1.default.urlencoded({ extended: true }));
    server.use(express_1.default.json());
};
const HTTPHeaders = (server) => server.use(helmet_1.default());
const Cors = (server) => server.use(cors_1.default({ credentials: true, origin: true }));
const Compression = (server) => {
    server.use(compression_1.default());
};
exports.default = [
    RateLimit,
    JSONParsing,
    BodyParsing,
    HTTPHeaders,
    Cors,
    Compression,
];
//# sourceMappingURL=appMiddleware.js.map