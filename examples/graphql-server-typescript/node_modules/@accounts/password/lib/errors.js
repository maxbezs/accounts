"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEnrollmentEmailErrors = exports.SendResetPasswordEmailErrors = exports.SendVerificationEmailErrors = exports.ChangePasswordErrors = exports.AuthenticateErrors = exports.PasswordAuthenticatorErrors = exports.ResetPasswordErrors = exports.VerifyEmailErrors = exports.AddEmailErrors = exports.CreateUserErrors = exports.errors = void 0;
exports.errors = {
    userNotFound: 'User not found',
    noPasswordSet: 'User has no password set',
    noEmailSet: 'User has no email set',
    incorrectPassword: 'Incorrect password',
    unrecognizedOptionsForLogin: 'Unrecognized options for login request',
    matchFailed: 'Match failed',
    invalidUsername: 'Invalid username',
    invalidEmail: 'Invalid email',
    invalidPassword: 'Invalid password',
    invalidNewPassword: 'Invalid new password',
    invalidToken: 'Invalid token',
    invalidCredentials: 'Invalid credentials',
    verifyEmailLinkExpired: 'Verify email link expired',
    verifyEmailLinkUnknownAddress: 'Verify email link is for unknown address',
    resetPasswordLinkExpired: 'Reset password link expired',
    resetPasswordLinkUnknownAddress: 'Reset password link is for unknown address',
    usernameAlreadyExists: 'Username already exists',
    emailAlreadyExists: 'Email already exists',
    usernameOrEmailRequired: 'Username or Email is required',
};
var CreateUserErrors;
(function (CreateUserErrors) {
    /**
     * Will throw if no username or email is provided.
     */
    CreateUserErrors["UsernameOrEmailRequired"] = "UsernameOrEmailRequired";
    /**
     * Username validation via option `validateUsername` failed.
     */
    CreateUserErrors["InvalidUsername"] = "InvalidUsername";
    /**
     * Email validation via option `validateEmail` failed.
     */
    CreateUserErrors["InvalidEmail"] = "InvalidEmail";
    /**
     * Password validation via option `validatePassword` failed.
     */
    CreateUserErrors["InvalidPassword"] = "InvalidPassword";
    /**
     * Email already exist in the database.
     */
    CreateUserErrors["EmailAlreadyExists"] = "EmailAlreadyExists";
    /**
     * Username already exist in the database.
     */
    CreateUserErrors["UsernameAlreadyExists"] = "UsernameAlreadyExists";
})(CreateUserErrors = exports.CreateUserErrors || (exports.CreateUserErrors = {}));
var AddEmailErrors;
(function (AddEmailErrors) {
    /**
     * Email validation via option `validateEmail` failed.
     */
    AddEmailErrors["InvalidEmail"] = "InvalidEmail";
})(AddEmailErrors = exports.AddEmailErrors || (exports.AddEmailErrors = {}));
var VerifyEmailErrors;
(function (VerifyEmailErrors) {
    /**
     * Will throw if token validation failed.
     */
    VerifyEmailErrors["InvalidToken"] = "InvalidToken";
    /**
     * The token does not exist or is expired.
     */
    VerifyEmailErrors["VerifyEmailLinkExpired"] = "VerifyEmailLinkExpired";
    /**
     * The token is valid but no email address found for the entry.
     */
    VerifyEmailErrors["VerifyEmailLinkUnknownAddress"] = "VerifyEmailLinkUnknownAddress";
})(VerifyEmailErrors = exports.VerifyEmailErrors || (exports.VerifyEmailErrors = {}));
var ResetPasswordErrors;
(function (ResetPasswordErrors) {
    /**
     * Will throw if token validation failed.
     */
    ResetPasswordErrors["InvalidToken"] = "InvalidToken";
    /**
     * Password validation via option `validatePassword` failed.
     */
    ResetPasswordErrors["InvalidNewPassword"] = "InvalidNewPassword";
    /**
     * The token does not exist or is expired.
     */
    ResetPasswordErrors["ResetPasswordLinkExpired"] = "ResetPasswordLinkExpired";
    /**
     * The token is valid but no email address found for the entry.
     */
    ResetPasswordErrors["ResetPasswordLinkUnknownAddress"] = "ResetPasswordLinkUnknownAddress";
    /**
     * User has no email set.
     */
    ResetPasswordErrors["NoEmailSet"] = "NoEmailSet";
})(ResetPasswordErrors = exports.ResetPasswordErrors || (exports.ResetPasswordErrors = {}));
var PasswordAuthenticatorErrors;
(function (PasswordAuthenticatorErrors) {
    PasswordAuthenticatorErrors["InvalidCredentials"] = "InvalidCredentials";
    PasswordAuthenticatorErrors["UserNotFound"] = "UserNotFound";
    PasswordAuthenticatorErrors["IncorrectPassword"] = "IncorrectPassword";
    PasswordAuthenticatorErrors["NoPasswordSet"] = "NoPasswordSet";
})(PasswordAuthenticatorErrors = exports.PasswordAuthenticatorErrors || (exports.PasswordAuthenticatorErrors = {}));
var AuthenticateErrors;
(function (AuthenticateErrors) {
    AuthenticateErrors["UnrecognizedOptionsForLogin"] = "UnrecognizedOptionsForLogin";
    AuthenticateErrors["MatchFailed"] = "MatchFailed";
    // thrown by PasswordAuthenticatorErrors
    AuthenticateErrors["InvalidCredentials"] = "InvalidCredentials";
    AuthenticateErrors["UserNotFound"] = "UserNotFound";
    AuthenticateErrors["IncorrectPassword"] = "IncorrectPassword";
    AuthenticateErrors["NoPasswordSet"] = "NoPasswordSet";
})(AuthenticateErrors = exports.AuthenticateErrors || (exports.AuthenticateErrors = {}));
var ChangePasswordErrors;
(function (ChangePasswordErrors) {
    /**
     * Password validation via option `validatePassword` failed.
     */
    ChangePasswordErrors["InvalidPassword"] = "InvalidPassword";
    /**
     * User has no email set.
     */
    ChangePasswordErrors["NoEmailSet"] = "NoEmailSet";
    // thrown by PasswordAuthenticatorErrors
    ChangePasswordErrors["InvalidCredentials"] = "InvalidCredentials";
    ChangePasswordErrors["UserNotFound"] = "UserNotFound";
    ChangePasswordErrors["IncorrectPassword"] = "IncorrectPassword";
    ChangePasswordErrors["NoPasswordSet"] = "NoPasswordSet";
})(ChangePasswordErrors = exports.ChangePasswordErrors || (exports.ChangePasswordErrors = {}));
var SendVerificationEmailErrors;
(function (SendVerificationEmailErrors) {
    /**
     * Will throw if email validation failed.
     */
    SendVerificationEmailErrors["InvalidEmail"] = "InvalidEmail";
    /**
     * Will throw if user is not found.
     * If option `ambiguousErrorMessages` is true, this will never throw.
     */
    SendVerificationEmailErrors["UserNotFound"] = "UserNotFound";
})(SendVerificationEmailErrors = exports.SendVerificationEmailErrors || (exports.SendVerificationEmailErrors = {}));
var SendResetPasswordEmailErrors;
(function (SendResetPasswordEmailErrors) {
    /**
     * Will throw if email validation failed.
     */
    SendResetPasswordEmailErrors["InvalidEmail"] = "InvalidEmail";
    /**
     * Will throw if user is not found.
     * If option `ambiguousErrorMessages` is true, this will never throw.
     */
    SendResetPasswordEmailErrors["UserNotFound"] = "UserNotFound";
})(SendResetPasswordEmailErrors = exports.SendResetPasswordEmailErrors || (exports.SendResetPasswordEmailErrors = {}));
var SendEnrollmentEmailErrors;
(function (SendEnrollmentEmailErrors) {
    /**
     * Will throw if email validation failed.
     */
    SendEnrollmentEmailErrors["InvalidEmail"] = "InvalidEmail";
    /**
     * Will throw if user is not found.
     * If option `ambiguousErrorMessages` is true, this will never throw.
     */
    SendEnrollmentEmailErrors["UserNotFound"] = "UserNotFound";
})(SendEnrollmentEmailErrors = exports.SendEnrollmentEmailErrors || (exports.SendEnrollmentEmailErrors = {}));
//# sourceMappingURL=errors.js.map