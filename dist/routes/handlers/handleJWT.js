"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const utils_1 = require("../../utils");
const { jwt_secret } = config_1.config;
const handleAuthorization = (req, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw new utils_1.HTTP401Error();
    }
    const token = authHeader.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, jwt_secret);
        next();
    }
    catch (error) {
        throw new utils_1.HTTP401Error();
    }
};
exports.default = [handleAuthorization];
//# sourceMappingURL=handleJWT.js.map