export declare enum AuthenticateWithServiceErrors {
    /**
     * Service is not registered on the server
     */
    ServiceNotFound = "ServiceNotFound",
    /**
     * User is deactivated, so not allowed to login
     */
    UserDeactivated = "UserDeactivated",
    /**
     * Service failed to authenticate the user
     */
    AuthenticationFailed = "AuthenticationFailed"
}
export declare enum LoginWithServiceErrors {
    /**
     * Service is not registered on the server
     */
    ServiceNotFound = "ServiceNotFound",
    /**
     * User is deactivated, so not allowed to login
     */
    UserDeactivated = "UserDeactivated",
    /**
     * Service failed to authenticate the user
     */
    AuthenticationFailed = "AuthenticationFailed"
}
export declare enum ImpersonateErrors {
    /**
     * Will throw if user is not found.
     */
    UserNotFound = "UserNotFound",
    /**
     * Session is not valid
     */
    InvalidSession = "InvalidSession",
    /**
     * Impersonated user not found
     * If option `ambiguousErrorMessages` is true, this will never throw.
     */
    ImpersonatedUserNotFound = "ImpersonatedUserNotFound",
    /**
     * Will throw if access token is missing.
     */
    InvalidToken = "InvalidToken",
    /**
     * Will throw if verification of the access token failed.
     */
    TokenVerificationFailed = "TokenVerificationFailed",
    /**
     * Will throw if session is not found.
     */
    SessionNotFound = "SessionNotFound"
}
export declare enum RefreshTokensErrors {
    /**
     * Will throw if access or refresh token are missing.
     */
    InvalidTokens = "InvalidTokens",
    /**
     * Will throw if verification of the access token or refresh token failed.
     */
    TokenVerificationFailed = "TokenVerificationFailed",
    /**
     * Will throw if session is not found.
     */
    SessionNotFound = "SessionNotFound",
    /**
     * Will throw if user is not found.
     */
    UserNotFound = "UserNotFound",
    /**
     * Session is not valid
     */
    InvalidSession = "InvalidSession"
}
export declare enum LogoutErrors {
    /**
     * Session is not valid
     */
    InvalidSession = "InvalidSession",
    /**
     * Will throw if access token is missing.
     */
    InvalidToken = "InvalidToken",
    /**
     * Will throw if verification of the access token failed.
     */
    TokenVerificationFailed = "TokenVerificationFailed",
    /**
     * Will throw if session is not found.
     */
    SessionNotFound = "SessionNotFound"
}
export declare enum FindSessionByAccessTokenErrors {
    /**
     * Will throw if access token is missing.
     */
    InvalidToken = "InvalidToken",
    /**
     * Will throw if verification of the access token failed.
     */
    TokenVerificationFailed = "TokenVerificationFailed",
    /**
     * Will throw if session is not found.
     */
    SessionNotFound = "SessionNotFound"
}
export declare enum ResumeSessionErrors {
    /**
     * Will throw if user is not found.
     */
    UserNotFound = "UserNotFound",
    /**
     * Session is not valid
     */
    InvalidSession = "InvalidSession",
    /**
     * Will throw if access token is missing.
     */
    InvalidToken = "InvalidToken",
    /**
     * Will throw if verification of the access token failed.
     */
    TokenVerificationFailed = "TokenVerificationFailed",
    /**
     * Will throw if session is not found.
     */
    SessionNotFound = "SessionNotFound"
}
