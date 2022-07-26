"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerCallback = void 0;
const send_error_1 = require("../../utils/send-error");
const providerCallback = (accountsServer, options) => async (req, res) => {
    try {
        const loggedInUser = await accountsServer.loginWithService('oauth', {
            ...(req.params || {}),
            ...(req.query || {}),
            ...(req.body || {}),
            ...(req.session || {}),
        }, req.infos);
        if (options && options.onOAuthSuccess) {
            options.onOAuthSuccess(req, res, loggedInUser);
        }
        if (options && options.transformOAuthResponse) {
            res.json(options.transformOAuthResponse(loggedInUser));
        }
        else {
            res.json(loggedInUser);
        }
    }
    catch (err) {
        if (options && options.onOAuthError) {
            options.onOAuthError(req, res, err);
        }
        (0, send_error_1.sendError)(res, err);
    }
};
exports.providerCallback = providerCallback;
//# sourceMappingURL=provider-callback.js.map