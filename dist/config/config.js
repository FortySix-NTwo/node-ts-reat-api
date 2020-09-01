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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    case 'test':
        path = `${__dirname}/../../.env.test`;
        break;
    case 'production':
        path = `${__dirname}/../../.env.production`;
        break;
    default:
        path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path });
exports.default = {
    environment: String(process.env.NODE_ENV),
    port: Number(process.env.PORT),
    host: String(process.env.HOST),
    pg_port: Number(process.env.POSTGRES_PORT),
    pg_host: String(process.env.POSTGRES_HOST),
    pg_db: String(process.env.POSTGRES_DB),
    pg_user: String(process.env.POSTGRES_USER),
    pg_pass: String(process.env.POSTGRES_PASSWORD),
    redis_url: String(process.env.REDIS_URL),
    jwt_secret: String(process.env.JWT),
    sentry_dsn: String(process.env.SENTRY_DSN),
};
//# sourceMappingURL=config.js.map