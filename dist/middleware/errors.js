"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const ClientError = (router) => {
    router.use((err, _req, res, next) => {
        switch (err.code) {
            case 'Bad Request':
                err = new utils_1.HTTP400Error();
                break;
            case 'Unauthorized':
                err = new utils_1.HTTP401Error();
                break;
            case 'Forbidden':
                err = new utils_1.HTTP403Error();
                break;
            default:
                err = new utils_1.HTTP404Error();
                break;
        }
        return utils_1.clientError(err, res, next);
    });
};
const ServerError = (router) => {
    router.use((err, _req, res, next) => {
        utils_1.serverError(err, res, next);
    });
};
const NotFoundError = (router) => {
    router.use((_req, _res) => {
        utils_1.notFoundError();
    });
};
exports.default = [NotFoundError, ClientError, ServerError];
//# sourceMappingURL=errors.js.map