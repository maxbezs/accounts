"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoader = void 0;
const userLoader = (accountsServer) => async (req, res, next) => {
    var _a, _b, _c;
    let accessToken = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.Authorization) ||
        ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization) ||
        ((_c = req.body) === null || _c === void 0 ? void 0 : _c.accessToken) ||
        undefined;
    accessToken = accessToken && accessToken.replace('Bearer ', '');
    if (accessToken) {
        try {
            req.authToken = accessToken;
            const user = await accountsServer.resumeSession(accessToken);
            req.user = user;
            req.userId = user.id;
        }
        catch (e) {
            // Do nothing
        }
    }
    next();
};
exports.userLoader = userLoader;
//# sourceMappingURL=user-loader.js.map