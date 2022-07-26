import { User, TokenRecord, DatabaseInterface, AuthenticationService, ConnectionInformations, LoginResult, CreateUserServicePassword, LoginUserPasswordService } from '@accounts/types';
import { TwoFactor, AccountsTwoFactorOptions } from '@accounts/two-factor';
import { AccountsServer } from '@accounts/server';
import { ErrorMessages } from './types';
export interface AccountsPasswordOptions {
    /**
     * Two factor options passed down to the @accounts/two-factor service.
     */
    twoFactor?: AccountsTwoFactorOptions;
    /**
     * The number of milliseconds from when a link to verify the user email is sent until token expires and user can't verify his email with the link anymore.
     * Defaults to 3 days.
     */
    verifyEmailTokenExpiration?: number;
    /**
     * The number of milliseconds from when a link to reset password is sent until token expires and user can't reset password with the link anymore.
     * Defaults to 3 days.
     */
    passwordResetTokenExpiration?: number;
    /**
     * The number of milliseconds from when a link to set inital password is sent until token expires and user can't set password with the link anymore.
     * Defaults to 30 days.
     */
    passwordEnrollTokenExpiration?: number;
    /**
     * Accounts password module errors
     */
    errors?: ErrorMessages;
    /**
     * Notify a user after his password has been changed.
     * This email is sent when the user reset his password and when he change it.
     * Default to true.
     */
    notifyUserAfterPasswordChanged?: boolean;
    /**
     * Default to false.
     */
    returnTokensAfterResetPassword?: boolean;
    /**
     * Invalidate existing sessions after password has been reset
     * Default to true.
     */
    invalidateAllSessionsAfterPasswordReset?: boolean;
    /**
     * Invalidate existing sessions after password has been changed
     * Default to false.
     */
    invalidateAllSessionsAfterPasswordChanged?: boolean;
    /**
     * Will remove all password reset tokens from the db after a password has been changed.
     * Default to true.
     */
    removeAllResetPasswordTokensAfterPasswordChanged?: boolean;
    /**
     * Will automatically send a verification email after signup.
     * Default to false.
     */
    sendVerificationEmailAfterSignup?: boolean;
    /**
     * Function that will validate the user object during `createUser`.
     * The user returned from this function will be directly inserted in the database so be careful when you whitelist the fields,
     * By default we only allow `username`, `email` and `password` fields.
     */
    validateNewUser?: (user: CreateUserServicePassword) => Promise<CreateUserServicePassword> | CreateUserServicePassword;
    /**
     * Function that check if the email is a valid email.
     * This function will be called when you call `createUser` and `addEmail`.
     */
    validateEmail?: (email?: string) => boolean;
    /**
     * Function that check if the password is valid.
     * This function will be called when you call `createUser` and `changePassword`.
     */
    validatePassword?: (password?: string) => boolean;
    /**
     * Function that check if the username is a valid username.
     * This function will be called when you call `createUser`.
     */
    validateUsername?: (username?: string) => boolean;
    /**
     * Function called to hash the user password, the password returned will be saved
     * in the database directly. By default we use bcrypt to hash the password.
     * Use this option alongside `verifyPassword` if you want to use argon2 for example.
     */
    hashPassword?: (password: string) => Promise<string>;
    /**
     * Function called to verify the password hash. By default we use bcrypt to hash the password.
     * Use this option alongside `hashPassword` if you want to use argon2 for example.
     */
    verifyPassword?: (password: string, hash: string) => Promise<boolean>;
}
export default class AccountsPassword<CustomUser extends User = User> implements AuthenticationService {
    serviceName: string;
    server: AccountsServer;
    twoFactor: TwoFactor;
    private options;
    private db;
    constructor(options?: AccountsPasswordOptions);
    setStore(store: DatabaseInterface<CustomUser>): void;
    authenticate(params: LoginUserPasswordService): Promise<CustomUser>;
    /**
     * @description Find a user by one of his emails.
     * @param {string} email - User email.
     * @returns {Promise<Object>} - Return a user or null if not found.
     */
    findUserByEmail(email: string): Promise<CustomUser | null>;
    /**
     * @description Find a user by his username.
     * @param {string} username - User username.
     * @returns {Promise<Object>} - Return a user or null if not found.
     */
    findUserByUsername(username: string): Promise<CustomUser | null>;
    /**
     * @description Add an email address for a user.
     * It will trigger the `validateEmail` option and throw if email is invalid.
     * Use this instead of directly updating the database.
     * @param {string} userId - User id.
     * @param {string} newEmail - A new email address for the user.
     * @param {boolean} [verified] - Whether the new email address should be marked as verified.
     * Defaults to false.
     * @returns {Promise<void>} - Return a Promise.
     * @throws {@link AddEmailErrors}
     */
    addEmail(userId: string, newEmail: string, verified?: boolean): Promise<void>;
    /**
     * @description Remove an email address for a user.
     * Use this instead of directly updating the database.
     * @param {string} userId - User id.
     * @param {string} email - The email address to remove.
     * @returns {Promise<void>} - Return a Promise.
     */
    removeEmail(userId: string, email: string): Promise<void>;
    /**
     * @description Marks the user's email address as verified.
     * @param {string} token - The token retrieved from the verification URL.
     * @returns {Promise<void>} - Return a Promise.
     * @throws {@link VerifyEmailErrors}
     */
    verifyEmail(token: string): Promise<void>;
    /**
     * @description Reset the password for a user using a token received in email.
     * It will trigger the `validatePassword` option and throw if password is invalid.
     * @param {string} token - The token retrieved from the reset password URL.
     * @param {string} newPassword - A new password for the user.
     * @returns {Promise<LoginResult | null>} - If `returnTokensAfterResetPassword` option is true return the session tokens and user object, otherwise return null.
     * @throws {@link ResetPasswordErrors}
     */
    resetPassword(token: string, newPassword: string, infos: ConnectionInformations): Promise<LoginResult | null>;
    /**
     * @description Change the password for a user.
     * @param {string} userId - User id.
     * @param {string} newPassword - A new password for the user.
     * @returns {Promise<void>} - Return a Promise.
     */
    setPassword(userId: string, newPassword: string): Promise<void>;
    /**
     * @description Change the current user's password.
     * It will trigger the `validatePassword` option and throw if password is invalid.
     * @param {string} userId - User id.
     * @param {string} oldPassword - The user's current password.
     * @param {string} newPassword - A new password for the user.
     * @returns {Promise<void>} - Return a Promise.
     * @throws {@link ChangePasswordErrors}
     */
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
    /**
     * @description Send an email with a link the user can use verify their email address.
     * @param {string} [address] - Which address of the user's to send the email to.
     * This address must be in the user's emails list.
     * Defaults to the first unverified email in the list.
     * If the address is already verified we do not send any email.
     * @returns {Promise<void>} - Return a Promise.
     * @throws {@link SendVerificationEmailErrors}
     */
    sendVerificationEmail(address: string): Promise<void>;
    /**
     * @description Send an email with a link the user can use to reset their password.
     * @param {string} [address] - Which address of the user's to send the email to.
     * This address must be in the user's emails list.
     * Defaults to the first email in the list.
     * @returns {Promise<void>} - Return a Promise.
     * @throws {@link SendResetPasswordEmailErrors}
     */
    sendResetPasswordEmail(address: string): Promise<void>;
    /**
     * @description Send an email with a link the user can use to set their initial password.
     * The user's email will be verified after clicking on the link.
     * @param {string} [address] - Which address of the user's to send the email to.
     * This address must be in the user's emails list.
     * Defaults to the first email in the list.
     * @returns {Promise<void>} - Return a Promise.
     * @throws {@link SendEnrollmentEmailErrors}
     */
    sendEnrollmentEmail(address: string): Promise<void>;
    /**
     * @description Create a new user.
     * @param user - The user object.
     * @returns Return the id of user created.
     * @throws {@link CreateUserErrors}
     */
    createUser(user: CreateUserServicePassword): Promise<string>;
    isTokenExpired(tokenRecord: TokenRecord, expiryDate: number): boolean;
    private passwordAuthenticator;
    /**
     * Given a username, user and/or email figure out the username and/or email.
     *
     * @param user An object containing at least `username`, `user` and/or `email`.
     * @returns An object containing `id`, `username` and `email`.
     */
    private toUsernameAndEmail;
}
