import { Db, IndexOptions } from 'mongodb';
import { DatabaseInterfaceServiceMagicLink, User } from '@accounts/types';
export interface MongoServiceMagicLinkOptions {
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
     * Should the user collection use _id as string or ObjectId.
     * Default 'true'.
     */
    convertUserIdToMongoObjectId?: boolean;
    /**
     * Function that generate the date for the timestamps.
     * Default to `(date?: Date) => (date ? date.getTime() : Date.now())`.
     */
    dateProvider?: (date?: Date) => any;
}
export declare class MongoServiceMagicLink implements DatabaseInterfaceServiceMagicLink {
    private options;
    private database;
    private userCollection;
    constructor(options: MongoServiceMagicLinkOptions);
    /**
     * Setup the mongo indexes needed for the token service.
     * @param options Options passed to the mongo native `createIndex` method.
     */
    setupIndexes(options?: Omit<IndexOptions, 'unique' | 'sparse'>): Promise<void>;
    /**
     * Find a user from a login token.
     * @param token Random token used to allow user to login.
     */
    findUserByLoginToken(token: string): Promise<User | null>;
    /**
     * Add a login token to a user.
     * @param userId Id used to update the user.
     * @param email Which address of the user's to link the token to.
     * @param token Random token used to allow user to login.
     */
    addLoginToken(userId: string, email: string, token: string): Promise<void>;
    /**
     * Remove all the login tokens for a user.
     * @param userId Id used to update the user.
     */
    removeAllLoginTokens(userId: string): Promise<void>;
}
