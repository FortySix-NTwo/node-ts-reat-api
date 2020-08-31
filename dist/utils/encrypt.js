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
exports.decodeBase64 = exports.encodeBase64 = exports.validateHash = exports.hashValue = void 0;
const bcrypt = __importStar(require("bcryptjs"));
exports.hashValue = (rounds, password) => {
    const salt = bcrypt.genSaltSync(rounds);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
};
exports.validateHash = (password, hash) => {
    const isValid = bcrypt.compareSync(password, hash);
    return isValid;
};
exports.encodeBase64 = (encode, length) => {
    const encodeValue = bcrypt.encodeBase64(encode, length);
    return encodeValue;
};
exports.decodeBase64 = (value, length) => {
    const decodedValue = bcrypt.decodeBase64(value, length);
    return decodedValue;
};
//# sourceMappingURL=encrypt.js.map