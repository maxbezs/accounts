"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestClient = void 0;
var tslib_1 = require("tslib");
var accounts_error_1 = require("./accounts-error");
var headers = {
    'Content-Type': 'application/json',
};
var RestClient = /** @class */ (function () {
    function RestClient(options) {
        this.options = options;
    }
    RestClient.prototype.fetch = function (route, args, customHeaders) {
        if (customHeaders === void 0) { customHeaders = {}; }
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var fetchOptions, res, _a, message, code;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fetchOptions = (0, tslib_1.__assign)({ headers: (0, tslib_1.__assign)((0, tslib_1.__assign)({}, headers), customHeaders) }, args);
                        return [4 /*yield*/, fetch("".concat(this.options.apiHost).concat(this.options.rootPath, "/").concat(route), fetchOptions)];
                    case 1:
                        res = _b.sent();
                        if (!res) return [3 /*break*/, 4];
                        if (!(res.status >= 400 && res.status < 600)) return [3 /*break*/, 3];
                        return [4 /*yield*/, res.json()];
                    case 2:
                        _a = _b.sent(), message = _a.message, code = _a.code;
                        // If code is present it means the server returned an `AccountsJsError` error
                        // so we can safely do the same on the client
                        if (code) {
                            throw new accounts_error_1.AccountsJsError(message, code);
                        }
                        throw new Error(message);
                    case 3: return [2 /*return*/, res.json()];
                    case 4: throw new Error('Server did not return a response');
                }
            });
        });
    };
    RestClient.prototype.authFetch = function (route, args, customHeaders) {
        if (customHeaders === void 0) { customHeaders = {}; }
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var tokens;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.refreshSession()];
                    case 1:
                        tokens = _a.sent();
                        return [2 /*return*/, this.fetch(route, args, (0, tslib_1.__assign)((0, tslib_1.__assign)({}, customHeaders), { Authorization: tokens ? 'Bearer ' + tokens.accessToken : '' }))];
                }
            });
        });
    };
    RestClient.prototype.authenticateWithService = function (provider, data, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify((0, tslib_1.__assign)({}, data)),
        };
        return this.fetch("".concat(provider, "/verifyAuthentication"), args, customHeaders);
    };
    RestClient.prototype.loginWithService = function (provider, data, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify((0, tslib_1.__assign)({}, data)),
        };
        return this.fetch("".concat(provider, "/authenticate"), args, customHeaders);
    };
    RestClient.prototype.impersonate = function (accessToken, impersonated, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                accessToken: accessToken,
                impersonated: impersonated,
            }),
        };
        return this.fetch('impersonate', args, customHeaders);
    };
    RestClient.prototype.refreshTokens = function (accessToken, refreshToken, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                accessToken: accessToken,
                refreshToken: refreshToken,
            }),
        };
        return this.fetch('refreshTokens', args, customHeaders);
    };
    RestClient.prototype.logout = function (customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({}),
        };
        return this.authFetch('logout', args, customHeaders);
    };
    RestClient.prototype.getUser = function (customHeaders) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var args;
            return (0, tslib_1.__generator)(this, function (_a) {
                args = {
                    method: 'POST',
                    body: JSON.stringify({}),
                };
                return [2 /*return*/, this.authFetch('user', args, customHeaders)];
            });
        });
    };
    RestClient.prototype.createUser = function (user, customHeaders) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var args;
            return (0, tslib_1.__generator)(this, function (_a) {
                args = {
                    method: 'POST',
                    body: JSON.stringify({ user: user }),
                };
                return [2 /*return*/, this.fetch('password/register', args, customHeaders)];
            });
        });
    };
    RestClient.prototype.resetPassword = function (token, newPassword, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                newPassword: newPassword,
            }),
        };
        return this.fetch('password/resetPassword', args, customHeaders);
    };
    RestClient.prototype.verifyEmail = function (token, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
            }),
        };
        return this.fetch('password/verifyEmail', args, customHeaders);
    };
    RestClient.prototype.sendVerificationEmail = function (email, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
            }),
        };
        return this.fetch('password/sendVerificationEmail', args, customHeaders);
    };
    RestClient.prototype.sendResetPasswordEmail = function (email, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
            }),
        };
        return this.fetch('password/sendResetPasswordEmail', args, customHeaders);
    };
    RestClient.prototype.addEmail = function (newEmail, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                newEmail: newEmail,
            }),
        };
        return this.authFetch('password/addEmail', args, customHeaders);
    };
    RestClient.prototype.changePassword = function (oldPassword, newPassword, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword,
            }),
        };
        return this.authFetch('password/changePassword', args, customHeaders);
    };
    RestClient.prototype.getTwoFactorSecret = function (customHeaders) {
        var args = {
            method: 'POST',
        };
        return this.fetch('password/twoFactorSecret', args, customHeaders);
    };
    RestClient.prototype.twoFactorSet = function (secret, code, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                secret: secret,
                code: code,
            }),
        };
        return this.authFetch('password/twoFactorSet', args, customHeaders);
    };
    RestClient.prototype.twoFactorUnset = function (code, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                code: code,
            }),
        };
        return this.authFetch('password/twoFactorUnset', args, customHeaders);
    };
    RestClient.prototype.requestMagicLinkEmail = function (email, customHeaders) {
        var args = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
            }),
        };
        return this.fetch('magiclink/requestMagicLinkEmail', args, customHeaders);
    };
    return RestClient;
}());
exports.RestClient = RestClient;
exports.default = RestClient;
//# sourceMappingURL=rest-client.js.map