"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsServer = exports.ResumeSessionErrors = exports.LogoutErrors = exports.RefreshTokensErrors = exports.FindSessionByAccessTokenErrors = exports.ImpersonateErrors = exports.LoginWithServiceErrors = exports.AuthenticateWithServiceErrors = exports.AccountsJsError = exports.ServerHooks = exports.getFirstUserEmail = exports.generateRandomToken = void 0;
const accounts_server_1 = require("./accounts-server");
Object.defineProperty(exports, "AccountsServer", { enumerable: true, get: function () { return accounts_server_1.AccountsServer; } });
var tokens_1 = require("./utils/tokens");
Object.defineProperty(exports, "generateRandomToken", { enumerable: true, get: function () { return tokens_1.generateRandomToken; } });
var get_first_user_email_1 = require("./utils/get-first-user-email");
Object.defineProperty(exports, "getFirstUserEmail", { enumerable: true, get: function () { return get_first_user_email_1.getFirstUserEmail; } });
var server_hooks_1 = require("./utils/server-hooks");
Object.defineProperty(exports, "ServerHooks", { enumerable: true, get: function () { return server_hooks_1.ServerHooks; } });
var accounts_error_1 = require("./utils/accounts-error");
Object.defineProperty(exports, "AccountsJsError", { enumerable: true, get: function () { return accounts_error_1.AccountsJsError; } });
var errors_1 = require("./errors");
Object.defineProperty(exports, "AuthenticateWithServiceErrors", { enumerable: true, get: function () { return errors_1.AuthenticateWithServiceErrors; } });
Object.defineProperty(exports, "LoginWithServiceErrors", { enumerable: true, get: function () { return errors_1.LoginWithServiceErrors; } });
Object.defineProperty(exports, "ImpersonateErrors", { enumerable: true, get: function () { return errors_1.ImpersonateErrors; } });
Object.defineProperty(exports, "FindSessionByAccessTokenErrors", { enumerable: true, get: function () { return errors_1.FindSessionByAccessTokenErrors; } });
Object.defineProperty(exports, "RefreshTokensErrors", { enumerable: true, get: function () { return errors_1.RefreshTokensErrors; } });
Object.defineProperty(exports, "LogoutErrors", { enumerable: true, get: function () { return errors_1.LogoutErrors; } });
Object.defineProperty(exports, "ResumeSessionErrors", { enumerable: true, get: function () { return errors_1.ResumeSessionErrors; } });
exports.default = accounts_server_1.AccountsServer;
//# sourceMappingURL=index.js.map