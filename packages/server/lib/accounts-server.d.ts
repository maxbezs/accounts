import * as jwt from 'jsonwebtoken';
import Emittery from 'emittery';
import { User, LoginResult, Tokens, Session, ImpersonationUserIdentity, ImpersonationResult, HookListener, AuthenticationService, ConnectionInformations } from '@maxbezs/types';
import { AccountsServerOptions } from './types/accounts-server-options';
import { EmailTemplateType } from './types/email-template-type';
declare const defaultOptions: {
    ambiguousErrorMessages: boolean;
    tokenSecret: string | {
        publicKey: jwt.Secret;
        privateKey: jwt.Secret;
    };
    tokenConfigs: {
        accessToken: {
            expiresIn: string;
        };
        refreshToken: {
            expiresIn: string;
        };
    };
    emailTemplates: import("./types/email-templates-type").EmailTemplatesType;
    sendMail: (mail: object) => Promise<void>;
    siteUrl: string;
    userObjectSanitizer: (user: User) => User;
    createNewSessionTokenOnRefresh: boolean;
    useInternalUserObjectSanitizer: boolean;
    useStatelessSession: boolean;
};
export declare class AccountsServer<CustomUser extends User = User> {
    options: AccountsServerOptions<CustomUser> & typeof defaultOptions;
    private services;
    private db;
    private hooks;
    constructor(options: AccountsServerOptions<CustomUser>, services: {
        [key: string]: AuthenticationService<CustomUser>;
    });
    getServices(): {
        [key: string]: AuthenticationService;
    };
    getOptions(): AccountsServerOptions<CustomUser>;
    getHooks(): Emittery;
    /**
     * Subscribe to an accounts-js event.
     * ```javascript
     * accountsServer.on(ServerHooks.ValidateLogin, ({ user }) => {
     *   // This hook is called every time a user try to login
     *   // You can use it to only allow users with verified email to login
     * });
     * ```
     */
    on(eventName: string, callback: HookListener): () => void;
    /**
     * @description Try to authenticate the user for a given service
     * @throws {@link AuthenticateWithServiceErrors}
     */
    authenticateWithService(serviceName: string, params: any, infos: ConnectionInformations): Promise<boolean>;
    /**
     * @throws {@link LoginWithServiceErrors}
     */
    loginWithService(serviceName: string, params: any, infos: ConnectionInformations): Promise<LoginResult>;
    /**
     * @description Server use only.
     * This method creates a session without authenticating any user identity.
     * Any authentication should happen before calling this function.
     * @param {User} user - The user object.
     * @param {ConnectionInformations} infos - User's connection informations.
     * @returns {Promise<LoginResult>} - Session tokens and user object.
     */
    loginWithUser(user: CustomUser, infos: ConnectionInformations): Promise<LoginResult>;
    /**
     * @description Impersonate to another user.
     * For security reasons, even if `useStatelessSession` is set to true the token will be checked against the database.
     * @param {string} accessToken - User access token.
     * @param {object} impersonated - impersonated user.
     * @param {ConnectionInformations} infos - User connection informations.
     * @returns {Promise<Object>} - ImpersonationResult
     * @throws {@link LoginWithServiceErrors}
     */
    impersonate(accessToken: string, impersonated: ImpersonationUserIdentity, infos: ConnectionInformations): Promise<ImpersonationResult>;
    /**
     * @description Refresh a user token.
     * @param {string} accessToken - User access token.
     * @param {string} refreshToken - User refresh token.
     * @param {ConnectionInformations} infos - User connection informations.
     * @returns {Promise<Object>} - LoginResult.
     * @throws {@link RefreshTokensErrors}
     */
    refreshTokens(accessToken: string, refreshToken: string, infos: ConnectionInformations): Promise<LoginResult>;
    /**
     * @description Refresh a user token.
     * @param {string} token - User session token.
     * @param {boolean} isImpersonated - Should be true if impersonating another user.
     * @param {User} user - The user object.
     * @returns {Promise<Tokens>} - Return a new accessToken and refreshToken.
     */
    createTokens({ token, isImpersonated, user, }: {
        token: string;
        isImpersonated?: boolean;
        user: CustomUser;
    }): Promise<Tokens>;
    /**
     * @description Logout a user and invalidate his session.
     * @param {string} accessToken - User access token.
     * @returns {Promise<void>} - Return a promise.
     * @throws {@link LogoutErrors}
     */
    logout(accessToken: string): Promise<void>;
    /**
     * @description Resume the current session associated to the access token. Will throw if the token
     * or the session is invalid.
     * If `useStatelessSession` is false the session validity will be checked against the database.
     * @param accessToken - User JWT access token.
     * @returns Return the user associated to the session.
     * @throws {@link ResumeSessionErrors}
     */
    resumeSession(accessToken: string): Promise<CustomUser>;
    /**
     * @description Find a session by his token.
     * @param {string} accessToken
     * @returns {Promise<Session>} - Return a session.
     * @throws {@link FindSessionByAccessTokenErrors}
     */
    findSessionByAccessToken(accessToken: string): Promise<Session>;
    /**
     * @description Find a user by his id.
     * @param {string} userId - User id.
     * @returns {Promise<Object>} - Return a user or null if not found.
     */
    findUserById(userId: string): Promise<CustomUser | null>;
    /**
     * @description Deactivate a user, the user will not be able to login until his account is reactivated.
     * @param {string} userId - User id.
     * @returns {Promise<void>} - Return a Promise.
     */
    deactivateUser(userId: string): Promise<void>;
    /**
     * @description Activate a user.
     * @param {string} userId - User id.
     * @returns {Promise<void>} - Return a Promise.
     */
    activateUser(userId: string): Promise<void>;
    prepareMail(to: string, token: string, user: CustomUser, pathFragment: string, emailTemplate: EmailTemplateType, from: string): any;
    sanitizeUser(user: CustomUser): CustomUser;
    private internalUserSanitizer;
    private defaultPrepareEmail;
    private defaultCreateTokenizedUrl;
    private createSessionToken;
    private createJwtPayload;
    private getSecretOrPublicKey;
    private getSecretOrPrivateKey;
}
export default AccountsServer;
