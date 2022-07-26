"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var language_1 = require("graphql/language");
var graphql_operations_1 = require("./graphql-operations");
var GraphQLErrorList_1 = require("./GraphQLErrorList");
var replace_user_fragment_1 = require("./utils/replace-user-fragment");
var GraphQLClient = /** @class */ (function () {
    function GraphQLClient(options) {
        this.options = options;
    }
    /**
     * Create a user with basic user info
     *
     * @param {CreateUser} user user object
     * @returns {Promise<CreateUserResult>} contains user's ID and LoginResult object if autologin is enabled
     * @memberof GraphQLClient
     */
    GraphQLClient.prototype.createUser = function (user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(this.options.userFieldsFragment
                        ? (0, replace_user_fragment_1.replaceUserFieldsFragment)(graphql_operations_1.CreateUserDocument, this.options.userFieldsFragment)
                        : graphql_operations_1.CreateUserDocument, 'createUser', { user: user })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.authenticateWithService = function (service, authenticateParams) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.AuthenticateWithServiceDocument, 'verifyAuthentication', {
                        serviceName: service,
                        params: authenticateParams,
                    })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.loginWithService = function (service, authenticateParams) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(this.options.userFieldsFragment
                        ? (0, replace_user_fragment_1.replaceUserFieldsFragment)(graphql_operations_1.AuthenticateDocument, this.options.userFieldsFragment)
                        : graphql_operations_1.AuthenticateDocument, 'authenticate', {
                        serviceName: service,
                        params: authenticateParams,
                    })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.getUser = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.query(this.options.userFieldsFragment
                        ? (0, replace_user_fragment_1.replaceUserFieldsFragment)(graphql_operations_1.GetUserDocument, this.options.userFieldsFragment)
                        : graphql_operations_1.GetUserDocument, 'getUser')];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.logout = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.LogoutDocument, 'logout')];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.refreshTokens = function (accessToken, refreshToken) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.RefreshTokensDocument, 'refreshTokens', { accessToken: accessToken, refreshToken: refreshToken })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.verifyEmail = function (token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.VerifyEmailDocument, 'verifyEmail', { token: token })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.sendResetPasswordEmail = function (email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.SendResetPasswordEmailDocument, 'sendResetPasswordEmail', { email: email })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.sendVerificationEmail = function (email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.SendVerificationEmailDocument, 'sendVerificationEmail', { email: email })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.resetPassword = function (token, newPassword) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.ResetPasswordDocument, 'resetPassword', { token: token, newPassword: newPassword })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.addEmail = function (newEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.AddEmailDocument, 'addEmail', { newEmail: newEmail })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.changePassword = function (oldPassword, newPassword) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.ChangePasswordDocument, 'changePassword', { oldPassword: oldPassword, newPassword: newPassword })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.getTwoFactorSecret = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.query(graphql_operations_1.GetTwoFactorSecretDocument, 'twoFactorSecret', {})];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.twoFactorSet = function (secret, code) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.TwoFactorSetDocument, 'twoFactorSet', { secret: secret, code: code })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.twoFactorUnset = function (code) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.TwoFactorUnsetDocument, 'twoFactorUnset', { code: code })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.impersonate = function (token, impersonated) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(this.options.userFieldsFragment
                        ? (0, replace_user_fragment_1.replaceUserFieldsFragment)(graphql_operations_1.ImpersonateDocument, this.options.userFieldsFragment)
                        : graphql_operations_1.ImpersonateDocument, 'impersonate', {
                        accessToken: token,
                        impersonated: {
                            userId: impersonated.userId,
                            username: impersonated.username,
                            email: impersonated.email,
                        },
                    })];
            });
        });
    };
    GraphQLClient.prototype.mutate = function (mutation, resultField, variables) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var tokens, _a, headers, _b, data, errors;
            return (0, tslib_1.__generator)(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(mutation === graphql_operations_1.RefreshTokensDocument)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.getTokens()];
                    case 1:
                        _a = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.client.refreshSession()];
                    case 3:
                        _a = _c.sent();
                        _c.label = 4;
                    case 4:
                        tokens = _a;
                        headers = {};
                        if (tokens) {
                            headers.Authorization = "Bearer ".concat(tokens.accessToken);
                        }
                        return [4 /*yield*/, this.options.graphQLClient.mutate({
                                mutation: mutation,
                                variables: variables,
                                context: {
                                    headers: headers,
                                },
                            })];
                    case 5:
                        _b = _c.sent(), data = _b.data, errors = _b.errors;
                        if (errors) {
                            throw new GraphQLErrorList_1.GraphQLErrorList(errors, "in mutation: \r\n ".concat((0, language_1.print)(mutation)));
                        }
                        return [2 /*return*/, data[resultField]];
                }
            });
        });
    };
    GraphQLClient.prototype.query = function (query, resultField, variables) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var tokens, headers, _a, data, errors;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.client.refreshSession()];
                    case 1:
                        tokens = _b.sent();
                        headers = {};
                        if (tokens) {
                            headers.Authorization = "Bearer ".concat(tokens.accessToken);
                        }
                        return [4 /*yield*/, this.options.graphQLClient.query({
                                query: query,
                                variables: variables,
                                fetchPolicy: 'network-only',
                                context: {
                                    headers: headers,
                                },
                            })];
                    case 2:
                        _a = _b.sent(), data = _a.data, errors = _a.errors;
                        if (errors) {
                            throw new GraphQLErrorList_1.GraphQLErrorList(errors, "in query: \r\n ".concat((0, language_1.print)(query)));
                        }
                        return [2 /*return*/, data[resultField]];
                }
            });
        });
    };
    /**
     * @inheritDoc
     */
    GraphQLClient.prototype.requestMagicLinkEmail = function (email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.mutate(graphql_operations_1.RequestMagicLinkEmailDocument, 'requestMagicLinkEmail', { email: email })];
            });
        });
    };
    return GraphQLClient;
}());
exports.default = GraphQLClient;
//# sourceMappingURL=graphql-client.js.map