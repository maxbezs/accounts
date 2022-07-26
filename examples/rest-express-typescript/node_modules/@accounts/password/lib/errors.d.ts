import { ErrorMessages } from './types';
export declare const errors: ErrorMessages;
export declare enum CreateUserErrors {
    /**
     * Will throw if no username or email is provided.
     */
    UsernameOrEmailRequired = "UsernameOrEmailRequired",
    /**
     * Username validation via option `validateUsername` failed.
     */
    InvalidUsername = "InvalidUsername",
    /**
     * Email validation via option `validateEmail` failed.
     */
    InvalidEmail = "InvalidEmail",
    /**
     * Password validation via option `validatePassword` failed.
     */
    InvalidPassword = "InvalidPassword",
    /**
     * Email already exist in the database.
     */
    EmailAlreadyExists = "EmailAlreadyExists",
    /**
     * Username already exist in the database.
     */
    UsernameAlreadyExists = "UsernameAlreadyExists"
}
export declare enum AddEmailErrors {
    /**
     * Email validation via option `validateEmail` failed.
     */
    InvalidEmail = "InvalidEmail"
}
export declare enum VerifyEmailErrors {
    /**
     * Will throw if token validation failed.
     */
    InvalidToken = "InvalidToken",
    /**
     * The token does not exist or is expired.
     */
    VerifyEmailLinkExpired = "VerifyEmailLinkExpired",
    /**
     * The token is valid but no email address found for the entry.
     */
    VerifyEmailLinkUnknownAddress = "VerifyEmailLinkUnknownAddress"
}
export declare enum ResetPasswordErrors {
    /**
     * Will throw if token validation failed.
     */
    InvalidToken = "InvalidToken",
    /**
     * Password validation via option `validatePassword` failed.
     */
    InvalidNewPassword = "InvalidNewPassword",
    /**
     * The token does not exist or is expired.
     */
    ResetPasswordLinkExpired = "ResetPasswordLinkExpired",
    /**
     * The token is valid but no email address found for the entry.
     */
    ResetPasswordLinkUnknownAddress = "ResetPasswordLinkUnknownAddress",
    /**
     * User has no email set.
     */
    NoEmailSet = "NoEmailSet"
}
export declare enum PasswordAuthenticatorErrors {
    InvalidCredentials = "InvalidCredentials",
    UserNotFound = "UserNotFound",
    IncorrectPassword = "IncorrectPassword",
    NoPasswordSet = "NoPasswordSet"
}
export declare enum AuthenticateErrors {
    UnrecognizedOptionsForLogin = "UnrecognizedOptionsForLogin",
    MatchFailed = "MatchFailed",
    InvalidCredentials = "InvalidCredentials",
    UserNotFound = "UserNotFound",
    IncorrectPassword = "IncorrectPassword",
    NoPasswordSet = "NoPasswordSet"
}
export declare enum ChangePasswordErrors {
    /**
     * Password validation via option `validatePassword` failed.
     */
    InvalidPassword = "InvalidPassword",
    /**
     * User has no email set.
     */
    NoEmailSet = "NoEmailSet",
    InvalidCredentials = "InvalidCredentials",
    UserNotFound = "UserNotFound",
    IncorrectPassword = "IncorrectPassword",
    NoPasswordSet = "NoPasswordSet"
}
export declare enum SendVerificationEmailErrors {
    /**
     * Will throw if email validation failed.
     */
    InvalidEmail = "InvalidEmail",
    /**
     * Will throw if user is not found.
     * If option `ambiguousErrorMessages` is true, this will never throw.
     */
    UserNotFound = "UserNotFound"
}
export declare enum SendResetPasswordEmailErrors {
    /**
     * Will throw if email validation failed.
     */
    InvalidEmail = "InvalidEmail",
    /**
     * Will throw if user is not found.
     * If option `ambiguousErrorMessages` is true, this will never throw.
     */
    UserNotFound = "UserNotFound"
}
export declare enum SendEnrollmentEmailErrors {
    /**
     * Will throw if email validation failed.
     */
    InvalidEmail = "InvalidEmail",
    /**
     * Will throw if user is not found.
     * If option `ambiguousErrorMessages` is true, this will never throw.
     */
    UserNotFound = "UserNotFound"
}
