"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerServerMiddleware = (wrappers, server) => {
    for (const wrapper of wrappers) {
        wrapper(server);
    }
};
exports.default = registerServerMiddleware;
//# sourceMappingURL=serverMiddlewareWrapper.js.map