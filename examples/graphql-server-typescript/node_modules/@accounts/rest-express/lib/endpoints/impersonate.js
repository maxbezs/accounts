"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.impersonate = void 0;
const send_error_1 = require("../utils/send-error");
const impersonate = (accountsServer) => async (req, res) => {
    try {
        const { impersonated, accessToken, } = req.body;
        const impersonateRes = await accountsServer.impersonate(accessToken, impersonated, req.infos);
        res.json(impersonateRes);
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.impersonate = impersonate;
//# sourceMappingURL=impersonate.js.map