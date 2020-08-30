"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerMiddleware = (middlewareWrappers, router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};
exports.default = registerMiddleware;
//# sourceMappingURL=middlewareWrapper.js.map