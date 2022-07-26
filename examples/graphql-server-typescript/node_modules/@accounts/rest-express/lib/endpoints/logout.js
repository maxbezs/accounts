"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const send_error_1 = require("../utils/send-error");
const logout = (accountsServer) => async (req, res) => {
    try {
        const { authToken } = req;
        await accountsServer.logout(authToken);
        res.json(null);
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.logout = logout;
//# sourceMappingURL=logout.js.map