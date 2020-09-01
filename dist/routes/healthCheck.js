"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reqOptions = (req) => ({
    path: req.path,
    methods: req.method,
    headers: req.headers,
    host: req.hostname,
    baseUrl: req.baseUrl,
    ip: req.ip,
});
const resOptions = (res) => ({
    crossOrigin: res.header('Access-Control-Allow-Origin', '*'),
    methods: res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS'),
    headers: res.header('Access-Control-Allow-Headers', 'Content-Type'),
    cache: res.header('Cache-Control', 'no-cache'),
});
const healthCheck = (router) => router.use('/api', (req, res) => {
    const data = reqOptions(req);
    res
        .status(200)
        .json({
        headers: resOptions(res),
        message: 'O.K',
        data,
    })
        .end();
});
exports.default = [healthCheck];
//# sourceMappingURL=healthCheck.js.map