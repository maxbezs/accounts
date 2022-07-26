"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = void 0;
const send_error_1 = require("../utils/send-error");
const refreshAccessToken = (accountsServer) => async (req, res) => {
    try {
        const { accessToken, refreshToken } = req.body;
        const refreshedSession = await accountsServer.refreshTokens(accessToken, refreshToken, req.infos);
        res.json(refreshedSession);
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.refreshAccessToken = refreshAccessToken;
//# sourceMappingURL=refresh-access-token.js.map