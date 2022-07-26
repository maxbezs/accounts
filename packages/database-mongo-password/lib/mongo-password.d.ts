import { Db, IndexOptions } from 'mongodb';
import { CreateUserServicePassword, DatabaseInterfaceServicePassword, User } from '@maxbezs/types';
export interface MongoUser {
    _id?: string | object;
    username?: string;
    services: {
        password?: {
            bcrypt: string;
        };
    };
    emails?: [
        {
            address: string;
            verified: boolean;
        }
    ];
    [key: string]: any;
}
export interface MongoServicePasswordOptions {
    /**
     * Mongo database object.
     */
    database: Db;
    /**
     * The users collection name.
     * Default 'users'.
     */
    userCollectionName?: string;
    /**
     * The timestamps for the users collection.
     * Default 'createdAt' and 'updatedAt'.
     */
    timestamps?: {
        createdAt: string;
        updatedAt: string;
    };
    /**
     * Should the user collection use _id as string or ObjectId.
     * Default 'true'.
     */
    convertUserIdToMongoObjectId?: boolean;
    /**
     * Perform case intensitive query for user name.
     * Default 'true'.
     */
    caseSensitiveUserName?: boolean;
    /**
     * Function that generate the id for new objects.
     */
    idProvider?: () => string | object;
    /**
     * Function that generate the date for the timestamps.
     * Default to `(date?: Date) => (date ? date.getTime() : Date.now())`.
     */
    dateProvider?: (date?: Date) => any;
}
export declare class MongoServicePassword implements DatabaseInterfaceServicePassword {
    private options;
    private database;
    private userCollection;
    constructor(options: MongoServicePasswordOptions);
    /**
     * Setup the mongo indexes needed for the password service.
     * @param options Options passed to the mongo native `createIndex` method.
     */
    setupIndexes(options?: Omit<IndexOptions, 'unique' | 'sparse'>): Promise<void>;
    /**
     * Create a new user by providing an email and/or a username and password.
     * Emails are saved lowercased.
     */
    createUser({ password, username, email, ...cleanUser }: CreateUserServicePassword): Promise<string>;
    /**
     * Get a user by his id.
     * @param userId Id used to query the user.
     */
    findUserById(userId: string): Promise<User | null>;
    /**
     * Get a user by one of his emails.
     * Email will be lowercased before running the query.
     * @param email Email used to query the user.
     */
    findUserByEmail(email: string): Promise<User | null>;
    /**
     * Get a user by his username.
     * Set the `caseSensitiveUserName` option to false if you want the username to be case sensitive.
     * @param email Email used to query the user.
     */
    findUserByUsername(username: string): Promise<User | null>;
    /**
     * Return the user password hash.
     * If the user has no password set, will return null.
     * @param userId Id used to query the user.
     */
    findPasswordHash(userId: string): Promise<string | null>;
    /**
     * Get a user by one of the email verification token.
     * @param token Verification token used to query the user.
     */
    findUserByEmailVerificationToken(token: string): Promise<User | null>;
    /**
     * Get a user by one of the reset password token.
     * @param token Reset password token used to query the user.
     */
    findUserByResetPasswordToken(token: string): Promise<User | null>;
    /**
     * Add an email address for a user.
     * @param userId Id used to update the user.
     * @param newEmail A new email address for the user.
     * @param verified Whether the new email address should be marked as verified.
     */
    addEmail(userId: string, newEmail: string, verified: boolean): Promise<void>;
    /**
     * Remove an email address for a user.
     * @param userId Id used to update the user.
     * @param email The email address to remove.
     */
    removeEmail(userId: string, email: string): Promise<void>;
    /**
     * Marks the user's email address as verified.
     * @param userId Id used to update the user.
     * @param email The email address to mark as verified.
     */
    verifyEmail(userId: string, email: string): Promise<void>;
    /**
     * Change the username of the user.
     * If the username already exists, the function will fail.
     * @param userId Id used to update the user.
     * @param newUsername A new username for the user.
     */
    setUsername(userId: string, newUsername: string): Promise<void>;
    /**
     * Change the password for a user.
     * @param userId Id used to update the user.
     * @param newPassword A new password for the user.
     */
    setPassword(userId: string, newPassword: string): Promise<void>;
    /**
     * Add an email verification token to a user.
     * @param userId Id used to update the user.
     * @param email Which address of the user's to link the token to.
     * @param token Random token used to verify the user email.
     */
    addEmailVerificationToken(userId: string, email: string, token: string): Promise<void>;
    /**
     * Add a reset password token to a user.
     * @param userId Id used to update the user.
     * @param email Which address of the user's to link the token to.
     * @param token Random token used to verify the user email.
     * @param reason Reason to use for the token.
     */
    addResetPasswordToken(userId: string, email: string, token: string, reason: string): Promise<void>;
    /**
     * Remove all the reset password tokens for a user.
     * @param userId Id used to update the user.
     */
    removeAllResetPasswordTokens(userId: string): Promise<void>;
}
