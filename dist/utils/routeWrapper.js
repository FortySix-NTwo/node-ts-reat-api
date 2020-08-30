"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerRoutes = (routes, router) => {
    for (const route of routes) {
        const { method, path, handler } = route;
        router[method](path, handler);
    }
};
exports.default = registerRoutes;
//# sourceMappingURL=routeWrapper.js.map