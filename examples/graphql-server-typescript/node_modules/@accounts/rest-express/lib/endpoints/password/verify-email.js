"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = exports.verifyEmail = void 0;
const server_1 = require("@accounts/server");
const password_1 = require("@accounts/password");
const send_error_1 = require("../../utils/send-error");
const verifyEmail = (accountsServer) => async (req, res) => {
    try {
        const { token } = req.body;
        const accountsPassword = accountsServer.getServices().password;
        await accountsPassword.verifyEmail(token);
        res.json(null);
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.verifyEmail = verifyEmail;
const sendVerificationEmail = (accountsServer) => async (req, res) => {
    try {
        const { email } = req.body;
        const accountsPassword = accountsServer.getServices().password;
        try {
            await accountsPassword.sendVerificationEmail(email);
        }
        catch (error) {
            // If ambiguousErrorMessages is true,
            // to prevent user enumeration we fail silently in case there is no user attached to this email
            if (accountsServer.options.ambiguousErrorMessages &&
                error instanceof server_1.AccountsJsError &&
                error.code === password_1.SendVerificationEmailErrors.UserNotFound) {
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
exports.sendVerificationEmail = sendVerificationEmail;
//# sourceMappingURL=verify-email.js.map