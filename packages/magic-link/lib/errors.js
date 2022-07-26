"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMagicLinkEmailErrors = exports.AuthenticateErrors = exports.MagicLinkAuthenticatorErrors = exports.errors = void 0;
exports.errors = {
    userNotFound: 'User not found',
    unrecognizedOptionsForLogin: 'Unrecognized options for login request',
    matchFailed: 'Match failed',
    invalidEmail: 'Invalid email',
    loginTokenExpired: 'Login token expired',
};
var MagicLinkAuthenticatorErrors;
(function (MagicLinkAuthenticatorErrors) {
    MagicLinkAuthenticatorErrors["LoginTokenExpired"] = "LoginTokenExpired";
})(MagicLinkAuthenticatorErrors = exports.MagicLinkAuthenticatorErrors || (exports.MagicLinkAuthenticatorErrors = {}));
var AuthenticateErrors;
(function (AuthenticateErrors) {
    AuthenticateErrors["UnrecognizedOptionsForLogin"] = "UnrecognizedOptionsForLogin";
    AuthenticateErrors["MatchFailed"] = "MatchFailed";
})(AuthenticateErrors = exports.AuthenticateErrors || (exports.AuthenticateErrors = {}));
var RequestMagicLinkEmailErrors;
(function (RequestMagicLinkEmailErrors) {
    RequestMagicLinkEmailErrors["InvalidEmail"] = "InvalidEmail";
    RequestMagicLinkEmailErrors["UserNotFound"] = "UserNotFound";
})(RequestMagicLinkEmailErrors = exports.RequestMagicLinkEmailErrors || (exports.RequestMagicLinkEmailErrors = {}));
//# sourceMappingURL=errors.js.map