"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = void 0;
exports.serverError = (err, res, _next) => {
    if (process.env.NODE_ENV === 'development') {
        res.status(500).send(err.stack);
    }
    res.status(500).send('Internal Server Error');
};
//# sourceMappingURL=serverError.js.map