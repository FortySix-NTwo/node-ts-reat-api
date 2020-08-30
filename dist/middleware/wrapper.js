"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterMiddleware = (middlewareWrappers, router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};
exports.default = RegisterMiddleware;
//# sourceMappingURL=wrapper.js.map