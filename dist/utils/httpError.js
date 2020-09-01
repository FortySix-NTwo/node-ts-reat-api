"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP404Error = exports.HTTP403Error = exports.HTTP401Error = exports.HTTP400Error = void 0;
const index_1 = require("./index");
class HTTP400Error extends index_1.HTTPClientError {
    constructor(message = 'Bad Request') {
        super(message);
        this.statusCode = 400;
    }
}
exports.HTTP400Error = HTTP400Error;
class HTTP401Error extends index_1.HTTPClientError {
    constructor(message = 'Unauthorized') {
        super(message);
        this.statusCode = 401;
    }
}
exports.HTTP401Error = HTTP401Error;
class HTTP403Error extends index_1.HTTPClientError {
    constructor(message = 'Forbidden') {
        super(message);
        this.statusCode = 403;
    }
}
exports.HTTP403Error = HTTP403Error;
class HTTP404Error extends index_1.HTTPClientError {
    constructor(message = 'Not found') {
        super(message);
        this.statusCode = 404;
    }
}
exports.HTTP404Error = HTTP404Error;
//# sourceMappingURL=httpError.js.map