"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.clientError = exports.notFoundError = void 0;
const httpError_1 = require("./httpError");
exports.notFoundError = () => {
    throw new httpError_1.HTTP404Error('Method not found.');
};
exports.clientError = (err, res, next) => {
    if (err instanceof httpError_1.HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    }
    else {
        next(err);
    }
};
exports.serverError = (err, res, _next) => {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Internal Server Error');
    }
    else {
        res.status(500).send(err.stack);
    }
};
//# sourceMappingURL=errorHandler.js.map