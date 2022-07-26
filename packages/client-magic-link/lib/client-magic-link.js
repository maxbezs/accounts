"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsClientMagicLink = void 0;
var tslib_1 = require("tslib");
var AccountsClientMagicLink = /** @class */ (function () {
    function AccountsClientMagicLink(client) {
        if (!client) {
            throw new Error('A valid client instance is required');
        }
        this.client = client;
    }
    /**
     * Log the user in with a token.
     */
    AccountsClientMagicLink.prototype.login = function (user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.client.loginWithService('magic-link', user)];
            });
        });
    };
    /**
     * Request a new login link.
     * @param {string} email - The email address to send a login link.
     */
    AccountsClientMagicLink.prototype.requestMagicLinkEmail = function (email) {
        return this.client.transport.requestMagicLinkEmail(email);
    };
    return AccountsClientMagicLink;
}());
exports.AccountsClientMagicLink = AccountsClientMagicLink;
//# sourceMappingURL=client-magic-link.js.map