import * as IORedis from 'ioredis';
import { Session, DatabaseInterfaceSessions, ConnectionInformations } from '@accounts/types';
import { AccountsRedisOptions } from './types';
export declare class RedisSessions implements DatabaseInterfaceSessions {
    private options;
    private db;
    constructor(db: IORedis.Redis, options?: AccountsRedisOptions);
    createSession(userId: string, token: string, connection?: ConnectionInformations, extraData?: object): Promise<string>;
    updateSession(sessionId: string, connection: ConnectionInformations): Promise<void>;
    invalidateSession(sessionId: string): Promise<void>;
    invalidateAllSessions(userId: string, excludedSessionIds?: string[]): Promise<void>;
    findSessionByToken(token: string): Promise<Session | null>;
    findSessionById(sessionId: string): Promise<Session | null>;
    /**
     * We need to format the session to have an object the server can understand.
     */
    private formatSession;
}
