"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerMiddleware = (wrappers, server) => {
    for (const wrapper of wrappers) {
        wrapper(server);
    }
};
exports.default = registerMiddleware;
//# sourceMappingURL=middlewareWrapper.js.map