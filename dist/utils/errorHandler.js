"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const notFoundError = () => {
    throw new index_1.HTTP404Error('Method not found.');
};
const clientError = (err, res, next) => {
    if (err instanceof index_1.HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    }
    else {
        next(err);
    }
};
const serverError = (err, res, _next) => {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Internal Server Error');
    }
    else {
        res.status(500).send(err.stack);
    }
};
exports.default = {
    notFoundError,
    clientError,
    serverError,
};
//# sourceMappingURL=errorHandler.js.map