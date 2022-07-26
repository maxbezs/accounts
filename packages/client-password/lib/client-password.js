"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsClientPassword = void 0;
var tslib_1 = require("tslib");
var AccountsClientPassword = /** @class */ (function () {
    function AccountsClientPassword(client, options) {
        if (options === void 0) { options = {}; }
        if (!client) {
            throw new Error('A valid client instance is required');
        }
        this.client = client;
        this.options = options;
    }
    /**
     * Create a new user.
     */
    AccountsClientPassword.prototype.createUser = function (user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var hashedPassword, createUserResult;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hashedPassword = this.hashPassword(user.password);
                        return [4 /*yield*/, this.client.transport.createUser((0, tslib_1.__assign)((0, tslib_1.__assign)({}, user), { password: hashedPassword }))];
                    case 1:
                        createUserResult = _a.sent();
                        if (!createUserResult.loginResult) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.setTokens(createUserResult.loginResult.tokens)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, createUserResult];
                }
            });
        });
    };
    /**
     * Log the user in with a password.
     */
    AccountsClientPassword.prototype.login = function (user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var hashedPassword;
            return (0, tslib_1.__generator)(this, function (_a) {
                hashedPassword = this.hashPassword(user.password);
                return [2 /*return*/, this.client.loginWithService('password', (0, tslib_1.__assign)((0, tslib_1.__assign)({}, user), { password: hashedPassword }))];
            });
        });
    };
    /**
     * Request a forgot password email.
     * @param {string} email - The email address to send a password reset link.
     */
    AccountsClientPassword.prototype.requestPasswordReset = function (email) {
        return this.client.transport.sendResetPasswordEmail(email);
    };
    /**
     * Reset the password for a user using a token received in email.
     * @param {string} token - The token retrieved from the reset password URL.
     * @param {string} newPassword - A new password for the user. The password is not sent in plain text.
     */
    AccountsClientPassword.prototype.resetPassword = function (token, newPassword) {
        var hashedPassword = this.hashPassword(newPassword);
        return this.client.transport.resetPassword(token, hashedPassword);
    };
    /**
     * Send an email with a link the user can use verify their email address.
     * @param {string} email - The email address to send the verification link.
     */
    AccountsClientPassword.prototype.requestVerificationEmail = function (email) {
        return this.client.transport.sendVerificationEmail(email);
    };
    /**
     * Marks the user's email address as verified using a token received in email.
     * @param {string} token - The token retrieved from the verification URL.
     */
    AccountsClientPassword.prototype.verifyEmail = function (token) {
        return this.client.transport.verifyEmail(token);
    };
    /**
     * Add an email address for a user. Must be logged in.
     * @param {string} newEmail - A new email address for the user.
     */
    AccountsClientPassword.prototype.addEmail = function (newEmail) {
        return this.client.transport.addEmail(newEmail);
    };
    /**
     * Change the current user's password. Must be logged in.
     * @param {string} oldPassword - The user's current password.
     * @param {string} newPassword - A new password for the user.
     */
    AccountsClientPassword.prototype.changePassword = function (oldPassword, newPassword) {
        return this.client.transport.changePassword(this.hashPassword(oldPassword), this.hashPassword(newPassword));
    };
    /**
     * Utility function that will return the password hashed.
     * @param {string} password - The password to hash.
     */
    AccountsClientPassword.prototype.hashPassword = function (password) {
        if (this.options.hashPassword) {
            return this.options.hashPassword(password);
        }
        return password;
    };
    return AccountsClientPassword;
}());
exports.AccountsClientPassword = AccountsClientPassword;
//# sourceMappingURL=client-password.js.map