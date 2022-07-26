"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = exports.resetPassword = void 0;
const server_1 = require("@accounts/server");
const password_1 = require("@accounts/password");
const send_error_1 = require("../../utils/send-error");
const resetPassword = (accountsServer) => async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const accountsPassword = accountsServer.getServices().password;
        const loginResult = await accountsPassword.resetPassword(token, newPassword, req.infos);
        res.json(loginResult);
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.resetPassword = resetPassword;
const sendResetPasswordEmail = (accountsServer) => async (req, res) => {
    try {
        const { email } = req.body;
        const accountsPassword = accountsServer.getServices().password;
        try {
            await accountsPassword.sendResetPasswordEmail(email);
        }
        catch (error) {
            // If ambiguousErrorMessages is true,
            // to prevent user enumeration we fail silently in case there is no user attached to this email
            if (accountsServer.options.ambiguousErrorMessages &&
                error instanceof server_1.AccountsJsError &&
                error.code === password_1.SendResetPasswordEmailErrors.UserNotFound) {
                return res.json(null);
            }
            throw error;
        }
        res.json(null);
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.sendResetPasswordEmail = sendResetPasswordEmail;
//# sourceMappingURL=reset.js.map