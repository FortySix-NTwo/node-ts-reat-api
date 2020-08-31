"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerification = void 0;
const crypto_1 = require("crypto");
const config_1 = require("../../config");
const { port, host } = config_1.config;
const URL = `${host}:${port}`;
class EmailVerification {
    constructor(userEmail) {
        this.userEmail = userEmail;
        this.random = crypto_1.randomBytes(32).toString('hex');
    }
    getURL() {
        return `http://${URL}/users/verify/${this.random}`;
    }
}
exports.EmailVerification = EmailVerification;
//# sourceMappingURL=emailValidation.js.map