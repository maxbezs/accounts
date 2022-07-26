import { AccountsClient } from '@accounts/client';
import { LoginResult, CreateUserServicePassword, CreateUserResult, LoginUserPasswordService } from '@accounts/types';
import { AccountsClientPasswordOptions } from './types';
export declare class AccountsClientPassword {
    private client;
    private options;
    constructor(client: AccountsClient, options?: AccountsClientPasswordOptions);
    /**
     * Create a new user.
     */
    createUser(user: CreateUserServicePassword): Promise<CreateUserResult>;
    /**
     * Log the user in with a password.
     */
    login(user: LoginUserPasswordService): Promise<LoginResult>;
    /**
     * Request a forgot password email.
     * @param {string} email - The email address to send a password reset link.
     */
    requestPasswordReset(email: string): Promise<void>;
    /**
     * Reset the password for a user using a token received in email.
     * @param {string} token - The token retrieved from the reset password URL.
     * @param {string} newPassword - A new password for the user. The password is not sent in plain text.
     */
    resetPassword(token: string, newPassword: string): Promise<LoginResult | null>;
    /**
     * Send an email with a link the user can use verify their email address.
     * @param {string} email - The email address to send the verification link.
     */
    requestVerificationEmail(email: string): Promise<void>;
    /**
     * Marks the user's email address as verified using a token received in email.
     * @param {string} token - The token retrieved from the verification URL.
     */
    verifyEmail(token: string): Promise<void>;
    /**
     * Add an email address for a user. Must be logged in.
     * @param {string} newEmail - A new email address for the user.
     */
    addEmail(newEmail: string): Promise<void>;
    /**
     * Change the current user's password. Must be logged in.
     * @param {string} oldPassword - The user's current password.
     * @param {string} newPassword - A new password for the user.
     */
    changePassword(oldPassword: string, newPassword: string): Promise<void>;
    /**
     * Utility function that will return the password hashed.
     * @param {string} password - The password to hash.
     */
    hashPassword(password: string): string;
}
