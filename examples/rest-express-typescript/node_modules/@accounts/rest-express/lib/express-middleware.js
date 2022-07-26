"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const provider_callback_1 = require("./endpoints/oauth/provider-callback");
const reset_1 = require("./endpoints/password/reset");
const verify_email_1 = require("./endpoints/password/verify-email");
const express = (0, tslib_1.__importStar)(require("express"));
const requestIp = (0, tslib_1.__importStar)(require("request-ip"));
const refresh_access_token_1 = require("./endpoints/refresh-access-token");
const get_user_1 = require("./endpoints/get-user");
const impersonate_1 = require("./endpoints/impersonate");
const logout_1 = require("./endpoints/logout");
const service_authenticate_1 = require("./endpoints/service-authenticate");
const verify_authentication_1 = require("./endpoints/verify-authentication");
const register_1 = require("./endpoints/password/register");
const two_factor_1 = require("./endpoints/password/two-factor");
const change_password_1 = require("./endpoints/password/change-password");
const add_email_1 = require("./endpoints/password/add-email");
const user_loader_1 = require("./user-loader");
const get_user_agent_1 = require("./utils/get-user-agent");
const request_magic_link_email_1 = require("./endpoints/magic-link/request-magic-link-email");
const defaultOptions = {
    path: '/accounts',
};
const accountsExpress = (accountsServer, options = {}) => {
    options = { ...defaultOptions, ...options };
    let { path } = options;
    // Stop invalid double slash root path
    if (path === '/') {
        path = '';
    }
    const router = express.Router();
    /**
     * Middleware to populate the user agent and ip.
     */
    router.use((req, _, next) => {
        const userAgent = (0, get_user_agent_1.getUserAgent)(req);
        const ip = requestIp.getClientIp(req);
        req.infos = {
            userAgent,
            ip,
        };
        next();
    });
    router.post(`${path}/impersonate`, (0, impersonate_1.impersonate)(accountsServer));
    router.get(`${path}/user`, (0, user_loader_1.userLoader)(accountsServer), (0, get_user_1.getUser)());
    router.post(`${path}/user`, (0, user_loader_1.userLoader)(accountsServer), (0, get_user_1.getUser)());
    router.post(`${path}/refreshTokens`, (0, refresh_access_token_1.refreshAccessToken)(accountsServer));
    router.post(`${path}/logout`, (0, user_loader_1.userLoader)(accountsServer), (0, logout_1.logout)(accountsServer));
    router.post(`${path}/:service/verifyAuthentication`, (0, verify_authentication_1.serviceVerifyAuthentication)(accountsServer));
    router.post(`${path}/:service/authenticate`, (0, service_authenticate_1.serviceAuthenticate)(accountsServer));
    const services = accountsServer.getServices();
    // @accounts/password
    if (services.password) {
        router.post(`${path}/password/register`, (0, register_1.registerPassword)(accountsServer));
        router.post(`${path}/password/verifyEmail`, (0, verify_email_1.verifyEmail)(accountsServer));
        router.post(`${path}/password/resetPassword`, (0, reset_1.resetPassword)(accountsServer));
        router.post(`${path}/password/sendVerificationEmail`, (0, verify_email_1.sendVerificationEmail)(accountsServer));
        router.post(`${path}/password/sendResetPasswordEmail`, (0, reset_1.sendResetPasswordEmail)(accountsServer));
        router.post(`${path}/password/addEmail`, (0, user_loader_1.userLoader)(accountsServer), (0, add_email_1.addEmail)(accountsServer));
        router.post(`${path}/password/changePassword`, (0, user_loader_1.userLoader)(accountsServer), (0, change_password_1.changePassword)(accountsServer));
        router.post(`${path}/password/twoFactorSecret`, (0, user_loader_1.userLoader)(accountsServer), (0, two_factor_1.twoFactorSecret)(accountsServer));
        router.post(`${path}/password/twoFactorSet`, (0, user_loader_1.userLoader)(accountsServer), (0, two_factor_1.twoFactorSet)(accountsServer));
        router.post(`${path}/password/twoFactorUnset`, (0, user_loader_1.userLoader)(accountsServer), (0, two_factor_1.twoFactorUnset)(accountsServer));
    }
    // @accounts/magic-link
    if (services.magicLink) {
        router.post(`${path}/magiclink/requestMagicLinkEmail`, (0, request_magic_link_email_1.requestMagicLinkEmail)(accountsServer));
    }
    // @accounts/oauth
    if (services.oauth) {
        router.get(`${path}/oauth/:provider/callback`, (0, provider_callback_1.providerCallback)(accountsServer, options));
    }
    return router;
};
exports.default = accountsExpress;
//# sourceMappingURL=express-middleware.js.map