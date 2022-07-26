import { DatabaseInterface } from '@maxbezs/types';
import { Configuration } from './types/configuration';
export declare class DatabaseManager implements DatabaseInterface {
    private userStorage;
    private sessionStorage;
    constructor(configuration: Configuration);
    private validateConfiguration;
    get createUser(): DatabaseInterface['createUser'];
    get findUserById(): DatabaseInterface['findUserById'];
    get findUserByEmail(): DatabaseInterface['findUserByEmail'];
    get findUserByUsername(): DatabaseInterface['findUserByUsername'];
    get findPasswordHash(): DatabaseInterface['findPasswordHash'];
    get findUserByEmailVerificationToken(): DatabaseInterface['findUserByEmailVerificationToken'];
    get findUserByResetPasswordToken(): DatabaseInterface['findUserByResetPasswordToken'];
    get findUserByServiceId(): DatabaseInterface['findUserByServiceId'];
    get addEmail(): DatabaseInterface['addEmail'];
    get removeEmail(): DatabaseInterface['removeEmail'];
    get verifyEmail(): DatabaseInterface['verifyEmail'];
    get setUsername(): DatabaseInterface['setUsername'];
    get setPassword(): DatabaseInterface['setPassword'];
    get setService(): DatabaseInterface['setService'];
    get unsetService(): DatabaseInterface['unsetService'];
    get createSession(): DatabaseInterface['createSession'];
    get updateSession(): DatabaseInterface['updateSession'];
    get invalidateSession(): DatabaseInterface['invalidateSession'];
    get invalidateAllSessions(): DatabaseInterface['invalidateAllSessions'];
    get removeAllResetPasswordTokens(): DatabaseInterface['removeAllResetPasswordTokens'];
    get findSessionByToken(): DatabaseInterface['findSessionByToken'];
    get findSessionById(): DatabaseInterface['findSessionById'];
    get addEmailVerificationToken(): DatabaseInterface['addEmailVerificationToken'];
    get addResetPasswordToken(): DatabaseInterface['addResetPasswordToken'];
    get setUserDeactivated(): DatabaseInterface['setUserDeactivated'];
    get findUserByLoginToken(): DatabaseInterface['findUserByLoginToken'];
    get addLoginToken(): DatabaseInterface['addLoginToken'];
    get removeAllLoginTokens(): DatabaseInterface['removeAllLoginTokens'];
}