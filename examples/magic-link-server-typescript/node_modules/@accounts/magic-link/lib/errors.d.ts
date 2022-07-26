import { ErrorMessages } from './types';
export declare const errors: ErrorMessages;
export declare enum MagicLinkAuthenticatorErrors {
    LoginTokenExpired = "LoginTokenExpired"
}
export declare enum AuthenticateErrors {
    UnrecognizedOptionsForLogin = "UnrecognizedOptionsForLogin",
    MatchFailed = "MatchFailed"
}
export declare enum RequestMagicLinkEmailErrors {
    InvalidEmail = "InvalidEmail",
    UserNotFound = "UserNotFound"
}
