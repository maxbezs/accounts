import { ConnectionInformations, CreateUser, DatabaseInterface } from '@accounts/types';
import { User } from './entity/User';
import { UserService } from './entity/UserService';
import { UserSession } from './entity/UserSession';
import { AccountsTypeormOptions } from './types';
export declare class AccountsTypeorm implements DatabaseInterface {
    private options;
    private userRepository;
    private emailRepository;
    private serviceRepository;
    private sessionRepository;
    constructor(options?: AccountsTypeormOptions);
    findUserByEmail(email: string): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
    findUserByResetPasswordToken(token: string): Promise<User | null>;
    findUserByEmailVerificationToken(token: string): Promise<User | null>;
    createUser(createUser: CreateUser): Promise<string>;
    setUsername(userId: string, newUsername: string): Promise<void>;
    findUserByServiceId(serviceName: string, serviceId: string): Promise<User | null>;
    getService(userId: string, serviceName: string): Promise<UserService | null>;
    setService(userId: string, serviceName: string, data: object, token?: string): Promise<void>;
    unsetService(userId: string, serviceName: string): Promise<void>;
    findPasswordHash(userId: string): Promise<string | null>;
    setPassword(userId: string, newPassword: string): Promise<void>;
    addResetPasswordToken(userId: string, email: string, token: string, reason: string): Promise<void>;
    addEmail(userId: string, newEmail: string, verified: boolean): Promise<void>;
    removeEmail(userId: string, email: string): Promise<void>;
    verifyEmail(userId: string, email: string): Promise<void>;
    addEmailVerificationToken(userId: string, email: string, token: string): Promise<void>;
    removeAllResetPasswordTokens(userId: string): Promise<void>;
    setUserDeactivated(userId: string, deactivated: boolean): Promise<void>;
    findSessionById(sessionId: string): Promise<UserSession | null>;
    findSessionByToken(token: string): Promise<UserSession | null>;
    findUserByLoginToken(token: string): Promise<User | null>;
    addLoginToken(userId: string, email: string, token: string): Promise<void>;
    removeAllLoginTokens(userId: string): Promise<void>;
    createSession(userId: string, token: string, connection?: ConnectionInformations, extra?: object): Promise<string>;
    updateSession(sessionId: string, connection: ConnectionInformations): Promise<void>;
    invalidateSession(sessionId: string): Promise<void>;
    invalidateAllSessions(userId: string, excludedSessionIds?: string[]): Promise<void>;
}
