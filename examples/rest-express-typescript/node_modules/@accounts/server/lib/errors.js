"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeSessionErrors = exports.FindSessionByAccessTokenErrors = exports.LogoutErrors = exports.RefreshTokensErrors = exports.ImpersonateErrors = exports.LoginWithServiceErrors = exports.AuthenticateWithServiceErrors = void 0;
var AuthenticateWithServiceErrors;
(function (AuthenticateWithServiceErrors) {
    /**
     * Service is not registered on the server
     */
    AuthenticateWithServiceErrors["ServiceNotFound"] = "ServiceNotFound";
    /**
     * User is deactivated, so not allowed to login
     */
    AuthenticateWithServiceErrors["UserDeactivated"] = "UserDeactivated";
    /**
     * Service failed to authenticate the user
     */
    AuthenticateWithServiceErrors["AuthenticationFailed"] = "AuthenticationFailed";
})(AuthenticateWithServiceErrors = exports.AuthenticateWithServiceErrors || (exports.AuthenticateWithServiceErrors = {}));
var LoginWithServiceErrors;
(function (LoginWithServiceErrors) {
    /**
     * Service is not registered on the server
     */
    LoginWithServiceErrors["ServiceNotFound"] = "ServiceNotFound";
    /**
     * User is deactivated, so not allowed to login
     */
    LoginWithServiceErrors["UserDeactivated"] = "UserDeactivated";
    /**
     * Service failed to authenticate the user
     */
    LoginWithServiceErrors["AuthenticationFailed"] = "AuthenticationFailed";
})(LoginWithServiceErrors = exports.LoginWithServiceErrors || (exports.LoginWithServiceErrors = {}));
var ImpersonateErrors;
(function (ImpersonateErrors) {
    /**
     * Will throw if user is not found.
     */
    ImpersonateErrors["UserNotFound"] = "UserNotFound";
    /**
     * Session is not valid
     */
    ImpersonateErrors["InvalidSession"] = "InvalidSession";
    /**
     * Impersonated user not found
     * If option `ambiguousErrorMessages` is true, this will never throw.
     */
    ImpersonateErrors["ImpersonatedUserNotFound"] = "ImpersonatedUserNotFound";
    // Thrown by FindSessionByAccessTokenErrors
    /**
     * Will throw if access token is missing.
     */
    ImpersonateErrors["InvalidToken"] = "InvalidToken";
    /**
     * Will throw if verification of the access token failed.
     */
    ImpersonateErrors["TokenVerificationFailed"] = "TokenVerificationFailed";
    /**
     * Will throw if session is not found.
     */
    ImpersonateErrors["SessionNotFound"] = "SessionNotFound";
})(ImpersonateErrors = exports.ImpersonateErrors || (exports.ImpersonateErrors = {}));
var RefreshTokensErrors;
(function (RefreshTokensErrors) {
    /**
     * Will throw if access or refresh token are missing.
     */
    RefreshTokensErrors["InvalidTokens"] = "InvalidTokens";
    /**
     * Will throw if verification of the access token or refresh token failed.
     */
    RefreshTokensErrors["TokenVerificationFailed"] = "TokenVerificationFailed";
    /**
     * Will throw if session is not found.
     */
    RefreshTokensErrors["SessionNotFound"] = "SessionNotFound";
    /**
     * Will throw if user is not found.
     */
    RefreshTokensErrors["UserNotFound"] = "UserNotFound";
    /**
     * Session is not valid
     */
    RefreshTokensErrors["InvalidSession"] = "InvalidSession";
})(RefreshTokensErrors = exports.RefreshTokensErrors || (exports.RefreshTokensErrors = {}));
var LogoutErrors;
(function (LogoutErrors) {
    /**
     * Session is not valid
     */
    LogoutErrors["InvalidSession"] = "InvalidSession";
    // Thrown by FindSessionByAccessTokenErrors
    /**
     * Will throw if access token is missing.
     */
    LogoutErrors["InvalidToken"] = "InvalidToken";
    /**
     * Will throw if verification of the access token failed.
     */
    LogoutErrors["TokenVerificationFailed"] = "TokenVerificationFailed";
    /**
     * Will throw if session is not found.
     */
    LogoutErrors["SessionNotFound"] = "SessionNotFound";
})(LogoutErrors = exports.LogoutErrors || (exports.LogoutErrors = {}));
var FindSessionByAccessTokenErrors;
(function (FindSessionByAccessTokenErrors) {
    /**
     * Will throw if access token is missing.
     */
    FindSessionByAccessTokenErrors["InvalidToken"] = "InvalidToken";
    /**
     * Will throw if verification of the access token failed.
     */
    FindSessionByAccessTokenErrors["TokenVerificationFailed"] = "TokenVerificationFailed";
    /**
     * Will throw if session is not found.
     */
    FindSessionByAccessTokenErrors["SessionNotFound"] = "SessionNotFound";
})(FindSessionByAccessTokenErrors = exports.FindSessionByAccessTokenErrors || (exports.FindSessionByAccessTokenErrors = {}));
var ResumeSessionErrors;
(function (ResumeSessionErrors) {
    /**
     * Will throw if user is not found.
     */
    ResumeSessionErrors["UserNotFound"] = "UserNotFound";
    /**
     * Session is not valid
     */
    ResumeSessionErrors["InvalidSession"] = "InvalidSession";
    // Thrown by FindSessionByAccessTokenErrors
    /**
     * Will throw if access token is missing.
     */
    ResumeSessionErrors["InvalidToken"] = "InvalidToken";
    /**
     * Will throw if verification of the access token failed.
     */
    ResumeSessionErrors["TokenVerificationFailed"] = "TokenVerificationFailed";
    /**
     * Will throw if session is not found.
     */
    ResumeSessionErrors["SessionNotFound"] = "SessionNotFound";
})(ResumeSessionErrors = exports.ResumeSessionErrors || (exports.ResumeSessionErrors = {}));
//# sourceMappingURL=errors.js.map