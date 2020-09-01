"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientError = exports.notFoundError = exports.HTTPClientError = void 0;
const index_1 = require("./index");
class HTTPClientError extends Error {
    constructor(message) {
        if (message instanceof Object) {
            super(JSON.stringify(message));
        }
        else {
            super(message);
        }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HTTPClientError = HTTPClientError;
exports.notFoundError = () => {
    throw new index_1.HTTP404Error('Method not found.');
};
exports.clientError = (err, res, next) => {
    if (err instanceof HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    }
    else {
        next(err);
    }
};
//# sourceMappingURL=clientError.js.map