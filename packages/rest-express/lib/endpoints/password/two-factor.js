"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoFactorUnset = exports.twoFactorSet = exports.twoFactorSecret = void 0;
const send_error_1 = require("../../utils/send-error");
const twoFactorSecret = (accountsServer) => async (req, res) => {
    try {
        const accountsPassword = accountsServer.getServices().password;
        const secret = await accountsPassword.twoFactor.getNewAuthSecret();
        res.json({ secret });
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.twoFactorSecret = twoFactorSecret;
const twoFactorSet = (accountsServer) => async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401);
            res.json({ message: 'Unauthorized' });
            return;
        }
        const accountsPassword = accountsServer.getServices().password;
        await accountsPassword.twoFactor.set(userId, req.body.secret, req.body.code);
        res.json({});
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.twoFactorSet = twoFactorSet;
const twoFactorUnset = (accountsServer) => async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401);
            res.json({ message: 'Unauthorized' });
            return;
        }
        const { code } = req.body;
        const accountsPassword = accountsServer.getServices().password;
        await accountsPassword.twoFactor.unset(userId, code);
        res.json({});
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.twoFactorUnset = twoFactorUnset;
//# sourceMappingURL=two-factor.js.map