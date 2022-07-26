"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@accounts/server");
const errors_1 = require("./errors");
const validation_1 = require("./utils/validation");
const errors_2 = require("./errors");
const user_1 = require("./utils/user");
const defaultOptions = {
    errors: errors_1.errors,
    // 15 minutes - 15 * 60 * 1000
    loginTokenExpiration: 900000,
};
class AccountsMagicLink {
    constructor(options = {}) {
        this.serviceName = 'magicLink';
        this.options = { ...defaultOptions, ...options };
    }
    setStore(store) {
        this.db = store;
    }
    async requestMagicLinkEmail(email) {
        if (!email || !(0, validation_1.isString)(email)) {
            throw new server_1.AccountsJsError(this.options.errors.invalidEmail, errors_2.RequestMagicLinkEmailErrors.InvalidEmail);
        }
        const user = await this.db.findUserByEmail(email);
        if (!user) {
            throw new server_1.AccountsJsError(this.options.errors.userNotFound, errors_2.RequestMagicLinkEmailErrors.UserNotFound);
        }
        // Remove pre-existing login tokens on user
        await this.db.removeAllLoginTokens(user.id);
        const token = (0, server_1.generateRandomToken)();
        await this.db.addLoginToken(user.id, email, token);
        const requestMagicLinkMail = this.server.prepareMail(email, token, this.server.sanitizeUser(user), 'magiclink', this.server.options.emailTemplates.magicLink, this.server.options.emailTemplates.from);
        await this.server.options.sendMail(requestMagicLinkMail);
    }
    async authenticate(params) {
        const { token } = params;
        if (!token) {
            throw new server_1.AccountsJsError(this.options.errors.unrecognizedOptionsForLogin, errors_1.AuthenticateErrors.UnrecognizedOptionsForLogin);
        }
        if (!(0, validation_1.isString)(token)) {
            throw new server_1.AccountsJsError(this.options.errors.matchFailed, errors_1.AuthenticateErrors.MatchFailed);
        }
        const foundUser = await this.magicLinkAuthenticator(token);
        // Remove all login tokens for user after login
        await this.db.removeAllLoginTokens(foundUser.id);
        return foundUser;
    }
    isTokenExpired(tokenRecord, expiryDate) {
        return Number(tokenRecord.when) + expiryDate < Date.now();
    }
    async magicLinkAuthenticator(token) {
        const foundUser = await this.db.findUserByLoginToken(token);
        if (!foundUser) {
            throw new server_1.AccountsJsError(this.options.errors.loginTokenExpired, errors_1.MagicLinkAuthenticatorErrors.LoginTokenExpired);
        }
        const loginTokens = (0, user_1.getUserLoginTokens)(foundUser);
        const tokenRecord = loginTokens.find((t) => t.token === token);
        if (!tokenRecord || this.isTokenExpired(tokenRecord, this.options.loginTokenExpiration)) {
            throw new server_1.AccountsJsError(this.options.errors.loginTokenExpired, errors_1.MagicLinkAuthenticatorErrors.LoginTokenExpired);
        }
        return foundUser;
    }
}
exports.default = AccountsMagicLink;
//# sourceMappingURL=accounts-magic-link.js.map