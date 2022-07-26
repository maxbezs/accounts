import { Db, IndexOptions } from 'mongodb';
import { ConnectionInformations, DatabaseInterfaceSessions, Session } from '@maxbezs/types';
export interface MongoSessionsOptions {
    /**
     * Mongo database object.
     */
    database: Db;
    /**
     * The sessions collection name.
     * Default 'sessions'.
     */
    sessionCollectionName?: string;
    /**
     * The timestamps for the sessions collection.
     * Default 'createdAt' and 'updatedAt'.
     */
    timestamps?: {
        createdAt: string;
        updatedAt: string;
    };
    /**
     * Should the session collection use _id as string or ObjectId.
     * If 'false' must include an 'idSessionProvider'.
     * Default 'true'.
     */
    convertSessionIdToMongoObjectId?: boolean;
    /**
     * Function that generates the _id for new Session objects.
     * If 'undefined' then 'convertSessionIdToMongoObjectId' must be 'true'.
     * Default 'undefined'
     */
    idSessionProvider?: () => string | object;
    /**
     * Function that generate the id for new User objects.
     */
    idProvider?: () => string | object;
    /**
     * Function that generate the date for the timestamps.
     * Default to `(date?: Date) => (date ? date.getTime() : Date.now())`.
     */
    dateProvider?: (date?: Date) => any;
}
export declare class MongoSessions implements DatabaseInterfaceSessions {
    private options;
    private database;
    private sessionCollection;
    constructor(options: MongoSessionsOptions);
    /**
     * Setup the mongo indexes needed for the sessions.
     * @param options Options passed to the mongo native `createIndex` method.
     */
    setupIndexes(options?: Omit<IndexOptions, 'unique' | 'sparse'>): Promise<void>;
    /**
     * Create a new session attached to a user.
     * @param userId User id of the session.
     * @param token Random token used to identify the session.
     * @param connection Connection informations related to the session (such as user agent, ip etc..).
     * @param extraData Any extra data you would like to add. The data will be added to the root of the object.
     */
    createSession(userId: string, token: string, connection?: ConnectionInformations, extraData?: object): Promise<string>;
    /**
     * Get a session by his id.
     * @param sessionId Id used to query the session.
     */
    findSessionById(sessionId: string): Promise<Session | null>;
    /**
     * Get a session by his token.
     * @param token Token used to query the session.
     */
    findSessionByToken(token: string): Promise<Session | null>;
    /**
     * Update the session informations, token and connection informations.
     * @param sessionId Id used to update the session.
     * @param connection Connection informations related to the session (such as user agent, ip etc..).
     * @param newToken New token that will replace the existing token for the session.
     */
    updateSession(sessionId: string, connection: ConnectionInformations, newToken?: string): Promise<void>;
    /**
     * Invalidate a session.
     * @param sessionId Id of the session to invalidate.
     */
    invalidateSession(sessionId: string): Promise<void>;
    /**
     * Invalidate all the session of a user.
     * @param userId User id of the sessions.
     * @param excludedSessionIds Can be used to whitelist some sessions. Eg: close all the sessions except these ones.
     */
    invalidateAllSessions(userId: string, excludedSessionIds?: string[]): Promise<void>;
}
