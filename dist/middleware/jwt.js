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
const jwt = __importStar(require("jsonwebtoken"));
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
        jwt.verify(token, secret);
        next();
    }
    catch (error) {
        throw new utils_1.HTTP401Error();
    }
};
exports.default = JWT;
//# sourceMappingURL=jwt.js.map