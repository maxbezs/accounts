"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsClient = void 0;
var tslib_1 = require("tslib");
var token_storage_local_1 = require("./token-storage-local");
var utils_1 = require("./utils");
var TokenKey;
(function (TokenKey) {
    TokenKey["AccessToken"] = "accessToken";
    TokenKey["RefreshToken"] = "refreshToken";
    TokenKey["OriginalAccessToken"] = "originalAccessToken";
    TokenKey["OriginalRefreshToken"] = "originalRefreshToken";
})(TokenKey || (TokenKey = {}));
var defaultOptions = {
    tokenStorage: token_storage_local_1.tokenStorageLocal,
    tokenStoragePrefix: 'accounts',
    tokenStorageSeparator: ':',
};
var AccountsClient = /** @class */ (function () {
    function AccountsClient(options, transport) {
        this.options = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, defaultOptions), options);
        this.storage = this.options.tokenStorage;
        if (!transport) {
            throw new Error('A valid transport is required');
        }
        this.transport = transport;
        this.transport.client = this;
    }
    /**
     * Get the tokens from the storage
     */
    AccountsClient.prototype.getTokens = function (original) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var accessToken, refreshToken;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.getItem(original
                            ? this.getTokenKey(TokenKey.OriginalAccessToken)
                            : this.getTokenKey(TokenKey.AccessToken))];
                    case 1:
                        accessToken = _a.sent();
                        return [4 /*yield*/, this.storage.getItem(original
                                ? this.getTokenKey(TokenKey.OriginalRefreshToken)
                                : this.getTokenKey(TokenKey.RefreshToken))];
                    case 2:
                        refreshToken = _a.sent();
                        if (!accessToken || !refreshToken) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, { accessToken: accessToken, refreshToken: refreshToken }];
                }
            });
        });
    };
    /**
     * Store the tokens in the storage
     */
    AccountsClient.prototype.setTokens = function (tokens, original) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.setItem(original
                            ? this.getTokenKey(TokenKey.OriginalAccessToken)
                            : this.getTokenKey(TokenKey.AccessToken), tokens.accessToken)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.setItem(original
                                ? this.getTokenKey(TokenKey.OriginalRefreshToken)
                                : this.getTokenKey(TokenKey.RefreshToken), tokens.refreshToken)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Remove the tokens from the storage
     */
    AccountsClient.prototype.clearTokens = function (original) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.removeItem(original
                            ? this.getTokenKey(TokenKey.OriginalAccessToken)
                            : this.getTokenKey(TokenKey.AccessToken))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.removeItem(original
                                ? this.getTokenKey(TokenKey.OriginalRefreshToken)
                                : this.getTokenKey(TokenKey.RefreshToken))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Authenticate the user with a specific service (not creating a session)
     */
    AccountsClient.prototype.authenticateWithService = function (service, credentials) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.transport.authenticateWithService(service, credentials)];
            });
        });
    };
    /**
     * Login the user with a specific service
     */
    AccountsClient.prototype.loginWithService = function (service, credentials) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var response;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transport.loginWithService(service, credentials)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, this.setTokens(response.tokens)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Refresh the user session
     * If the tokens have expired try to refresh them
     */
    AccountsClient.prototype.refreshSession = function (force) {
        if (force === void 0) { force = false; }
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var tokens, isAccessTokenExpired, isRefreshTokenExpired, refreshedSession, err_1;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTokens()];
                    case 1:
                        tokens = _a.sent();
                        if (!tokens) return [3 /*break*/, 10];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 10]);
                        isAccessTokenExpired = (0, utils_1.isTokenExpired)(tokens.accessToken);
                        isRefreshTokenExpired = (0, utils_1.isTokenExpired)(tokens.refreshToken);
                        if (!((force || isAccessTokenExpired) && !isRefreshTokenExpired)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.transport.refreshTokens(tokens.accessToken, tokens.refreshToken)];
                    case 3:
                        refreshedSession = _a.sent();
                        return [4 /*yield*/, this.setTokens(refreshedSession.tokens)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, refreshedSession.tokens];
                    case 5:
                        if (!isRefreshTokenExpired) return [3 /*break*/, 7];
                        // Refresh token is expired, user must sign back in
                        return [4 /*yield*/, this.clearTokens()];
                    case 6:
                        // Refresh token is expired, user must sign back in
                        _a.sent();
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/, tokens];
                    case 8:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.clearTokens()];
                    case 9:
                        _a.sent();
                        throw err_1;
                    case 10: return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Impersonate to another user.
     */
    AccountsClient.prototype.impersonate = function (impersonated) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var tokens, res;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTokens()];
                    case 1:
                        tokens = _a.sent();
                        if (!tokens) {
                            throw new Error('An access token is required');
                        }
                        return [4 /*yield*/, this.transport.impersonate(tokens.accessToken, impersonated)];
                    case 2:
                        res = _a.sent();
                        if (!(!res.authorized || !res.tokens)) return [3 /*break*/, 3];
                        throw new Error("User unauthorized to impersonate");
                    case 3: return [4 /*yield*/, this.setTokens(tokens, true)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.setTokens(res.tokens)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Stop the user impersonation.
     */
    AccountsClient.prototype.stopImpersonation = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var tokens;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTokens(true)];
                    case 1:
                        tokens = _a.sent();
                        if (!tokens) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.logout()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.setTokens(tokens)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.clearTokens(true)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the user infos
     */
    AccountsClient.prototype.getUser = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.transport.getUser()];
            });
        });
    };
    /**
     * Logout the user
     * Call the server to invalidate the tokens
     * Clean user local storage
     */
    AccountsClient.prototype.logout = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var tokens;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTokens()];
                    case 1:
                        tokens = _a.sent();
                        if (!tokens) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.transport.logout()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.clearTokens()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AccountsClient.prototype.getTokenKey = function (tokenName) {
        return "".concat(this.options.tokenStoragePrefix).concat(this.options.tokenStorageSeparator).concat(tokenName);
    };
    return AccountsClient;
}());
exports.AccountsClient = AccountsClient;
//# sourceMappingURL=accounts-client.js.map