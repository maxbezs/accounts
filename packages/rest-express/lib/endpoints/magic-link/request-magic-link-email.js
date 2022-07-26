"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestMagicLinkEmail = void 0;
const server_1 = require("@accounts/server");
const magic_link_1 = require("@accounts/magic-link");
const send_error_1 = require("../../utils/send-error");
const requestMagicLinkEmail = (accountsServer) => async (req, res) => {
    try {
        const { email } = req.body;
        const accountsMagicLink = accountsServer.getServices().magicLink;
        try {
            await accountsMagicLink.requestMagicLinkEmail(email);
        }
        catch (error) {
            // If ambiguousErrorMessages is true,
            // to prevent user enumeration we fail silently in case there is no user attached to this email
            if (accountsServer.options.ambiguousErrorMessages &&
                error instanceof server_1.AccountsJsError &&
                error.code === magic_link_1.RequestMagicLinkEmailErrors.UserNotFound) {
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
exports.requestMagicLinkEmail = requestMagicLinkEmail;
//# sourceMappingURL=request-magic-link-email.js.map