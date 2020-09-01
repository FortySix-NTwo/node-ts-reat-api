"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerRouterMiddleware = (wrappers, router) => {
    for (const wrapper of wrappers) {
        wrapper(router);
    }
};
exports.default = registerRouterMiddleware;
//# sourceMappingURL=routesMiddlewareWrapper.js.map