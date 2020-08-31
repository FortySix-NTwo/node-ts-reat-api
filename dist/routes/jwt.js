"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const utils_1 = require("../utils");
const secret = config_1.config.jwt;
const JWT = (req, _res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw new utils_1.HTTP401Error();
    }
    const token = authHeader.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        throw new utils_1.HTTP401Error();
    }
};
exports.default = [JWT];
//# sourceMappingURL=jwt.js.map