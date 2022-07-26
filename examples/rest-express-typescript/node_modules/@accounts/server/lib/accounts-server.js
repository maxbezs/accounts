"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsServer = void 0;
const tslib_1 = require("tslib");
const lodash_merge_1 = (0, tslib_1.__importDefault)(require("lodash.merge"));
const jwt = (0, tslib_1.__importStar)(require("jsonwebtoken"));
const emittery_1 = (0, tslib_1.__importDefault)(require("emittery"));
const tokens_1 = require("./utils/tokens");
const email_1 = require("./utils/email");
const server_hooks_1 = require("./utils/server-hooks");
const accounts_error_1 = require("./utils/accounts-error");
const errors_1 = require("./errors");
const validation_1 = require("./utils/validation");
const defaultOptions = {
    ambiguousErrorMessages: true,
    tokenSecret: 'secret',
    tokenConfigs: {
        accessToken: {
            expiresIn: '90m',
        },
        refreshToken: {
            expiresIn: '7d',
        },
    },
    emailTemplates: email_1.emailTemplates,
    sendMail: email_1.sendMail,
    siteUrl: 'http://localhost:3000',
    userObjectSanitizer: (user) => user,
    createNewSessionTokenOnRefresh: false,
    useInternalUserObjectSanitizer: true,
    useStatelessSession: false,
};
class AccountsServer {
    constructor(options, services) {
        this.options = (0, lodash_merge_1.default)({ ...defaultOptions }, options);
        if (!this.options.db) {
            throw new Error('A database driver is required');
        }
        if (this.options.tokenSecret === defaultOptions.tokenSecret) {
            console.log(`
You are using the default secret "${this.options.tokenSecret}" which is not secure.
Please change it with a strong random token.`);
        }
        if (this.options.ambiguousErrorMessages && this.options.enableAutologin) {
            throw new Error(`Can't enable autologin when ambiguous error messages are enabled (https://www.accountsjs.com/docs/api/server/globals#ambiguouserrormessages).
Please set ambiguousErrorMessages to false to be able to use autologin.`);
        }
        this.services = services || {};
        this.db = this.options.db;
        // Set the db to all services
        for (const service in this.services) {
            this.services[service].setStore(this.db);
            this.services[service].server = this;
        }
        // Initialize hooks
        this.hooks = new emittery_1.default();
    }
    getServices() {
        return this.services;
    }
    getOptions() {
        return this.options;
    }
    getHooks() {
        return this.hooks;
    }
    /**
     * Subscribe to an accounts-js event.
     * ```javascript
     * accountsServer.on(ServerHooks.ValidateLogin, ({ user }) => {
     *   // This hook is called every time a user try to login
     *   // You can use it to only allow users with verified email to login
     * });
     * ```
     */
    on(eventName, callback) {
        this.hooks.on(eventName, callback);
        return () => this.hooks.off(eventName, callback);
    }
    /**
     * @description Try to authenticate the user for a given service
     * @throws {@link AuthenticateWithServiceErrors}
     */
    async authenticateWithService(serviceName, params, infos) {
        const hooksInfo = {
            // The service name, such as “password” or “twitter”.
            service: serviceName,
            // The connection informations <ConnectionInformations>
            connection: infos,
            // Params received
            params,
        };
        try {
            if (!this.services[serviceName]) {
                throw new accounts_error_1.AccountsJsError(`No service with the name ${serviceName} was registered.`, errors_1.AuthenticateWithServiceErrors.ServiceNotFound);
            }
            const user = await this.services[serviceName].authenticate(params);
            hooksInfo.user = user;
            if (!user) {
                throw new accounts_error_1.AccountsJsError(`Service ${serviceName} was not able to authenticate user`, errors_1.AuthenticateWithServiceErrors.AuthenticationFailed);
            }
            if (user.deactivated) {
                throw new accounts_error_1.AccountsJsError('Your account has been deactivated', errors_1.AuthenticateWithServiceErrors.UserDeactivated);
            }
            await this.hooks.emit(server_hooks_1.ServerHooks.AuthenticateSuccess, hooksInfo);
            return true;
        }
        catch (err) {
            await this.hooks.emit(server_hooks_1.ServerHooks.AuthenticateError, { ...hooksInfo, error: err });
            throw err;
        }
    }
    /**
     * @throws {@link LoginWithServiceErrors}
     */
    async loginWithService(serviceName, params, infos) {
        const hooksInfo = {
            // The service name, such as “password” or “twitter”.
            service: serviceName,
            // The connection informations <ConnectionInformations>
            connection: infos,
            // Params received
            params,
        };
        try {
            if (!this.services[serviceName]) {
                throw new accounts_error_1.AccountsJsError(`No service with the name ${serviceName} was registered.`, errors_1.LoginWithServiceErrors.ServiceNotFound);
            }
            const user = await this.services[serviceName].authenticate(params);
            hooksInfo.user = user;
            if (!user) {
                throw new accounts_error_1.AccountsJsError(`Service ${serviceName} was not able to authenticate user`, errors_1.LoginWithServiceErrors.AuthenticationFailed);
            }
            if (user.deactivated) {
                throw new accounts_error_1.AccountsJsError('Your account has been deactivated', errors_1.LoginWithServiceErrors.UserDeactivated);
            }
            // Let the user validate the login attempt
            await this.hooks.emitSerial(server_hooks_1.ServerHooks.ValidateLogin, hooksInfo);
            const loginResult = await this.loginWithUser(user, infos);
            await this.hooks.emit(server_hooks_1.ServerHooks.LoginSuccess, hooksInfo);
            return loginResult;
        }
        catch (err) {
            await this.hooks.emit(server_hooks_1.ServerHooks.LoginError, { ...hooksInfo, error: err });
            throw err;
        }
    }
    /**
     * @description Server use only.
     * This method creates a session without authenticating any user identity.
     * Any authentication should happen before calling this function.
     * @param {User} user - The user object.
     * @param {ConnectionInformations} infos - User's connection informations.
     * @returns {Promise<LoginResult>} - Session tokens and user object.
     */
    async loginWithUser(user, infos) {
        const token = await this.createSessionToken(user);
        const sessionId = await this.db.createSession(user.id, token, infos);
        const { accessToken, refreshToken } = await this.createTokens({
            token,
            user,
        });
        return {
            sessionId,
            tokens: {
                refreshToken,
                accessToken,
            },
            user,
        };
    }
    /**
     * @description Impersonate to another user.
     * For security reasons, even if `useStatelessSession` is set to true the token will be checked against the database.
     * @param {string} accessToken - User access token.
     * @param {object} impersonated - impersonated user.
     * @param {ConnectionInformations} infos - User connection informations.
     * @returns {Promise<Object>} - ImpersonationResult
     * @throws {@link LoginWithServiceErrors}
     */
    async impersonate(accessToken, impersonated, infos) {
        try {
            const session = await this.findSessionByAccessToken(accessToken);
            if (!session.valid) {
                throw new accounts_error_1.AccountsJsError('Session is not valid for user', errors_1.ImpersonateErrors.InvalidSession);
            }
            const user = await this.db.findUserById(session.userId);
            if (!user) {
                throw new accounts_error_1.AccountsJsError('User not found', errors_1.ImpersonateErrors.UserNotFound);
            }
            let impersonatedUser;
            if (impersonated.userId) {
                impersonatedUser = await this.db.findUserById(impersonated.userId);
            }
            else if (impersonated.username) {
                impersonatedUser = await this.db.findUserByUsername(impersonated.username);
            }
            else if (impersonated.email) {
                impersonatedUser = await this.db.findUserByEmail(impersonated.email);
            }
            if (!impersonatedUser) {
                if (this.options.ambiguousErrorMessages) {
                    return { authorized: false };
                }
                throw new accounts_error_1.AccountsJsError(`Impersonated user not found`, errors_1.ImpersonateErrors.ImpersonatedUserNotFound);
            }
            if (!this.options.impersonationAuthorize) {
                return { authorized: false };
            }
            const isAuthorized = await this.options.impersonationAuthorize(user, impersonatedUser);
            if (!isAuthorized) {
                return { authorized: false };
            }
            const token = await this.createSessionToken(impersonatedUser);
            const newSessionId = await this.db.createSession(impersonatedUser.id, token, infos, {
                impersonatorUserId: user.id,
            });
            const impersonationTokens = await this.createTokens({
                token,
                isImpersonated: true,
                user,
            });
            const impersonationResult = {
                authorized: true,
                tokens: impersonationTokens,
                user: this.sanitizeUser(impersonatedUser),
            };
            await this.hooks.emit(server_hooks_1.ServerHooks.ImpersonationSuccess, {
                user,
                impersonationResult,
                sessionId: newSessionId,
            });
            return impersonationResult;
        }
        catch (e) {
            await this.hooks.emit(server_hooks_1.ServerHooks.ImpersonationError, e);
            throw e;
        }
    }
    /**
     * @description Refresh a user token.
     * @param {string} accessToken - User access token.
     * @param {string} refreshToken - User refresh token.
     * @param {ConnectionInformations} infos - User connection informations.
     * @returns {Promise<Object>} - LoginResult.
     * @throws {@link RefreshTokensErrors}
     */
    async refreshTokens(accessToken, refreshToken, infos) {
        try {
            if (!(0, validation_1.isString)(accessToken) || !(0, validation_1.isString)(refreshToken)) {
                throw new accounts_error_1.AccountsJsError('An accessToken and refreshToken are required', errors_1.RefreshTokensErrors.InvalidTokens);
            }
            let sessionToken;
            try {
                jwt.verify(refreshToken, this.getSecretOrPublicKey());
                const decodedAccessToken = jwt.verify(accessToken, this.getSecretOrPublicKey(), {
                    ignoreExpiration: true,
                });
                sessionToken = decodedAccessToken.data.token;
            }
            catch (err) {
                throw new accounts_error_1.AccountsJsError('Tokens are not valid', errors_1.RefreshTokensErrors.TokenVerificationFailed);
            }
            const session = await this.db.findSessionByToken(sessionToken);
            if (!session) {
                throw new accounts_error_1.AccountsJsError('Session not found', errors_1.RefreshTokensErrors.SessionNotFound);
            }
            if (session.valid) {
                const user = await this.db.findUserById(session.userId);
                if (!user) {
                    throw new accounts_error_1.AccountsJsError('User not found', errors_1.RefreshTokensErrors.UserNotFound);
                }
                let newToken;
                if (this.options.createNewSessionTokenOnRefresh) {
                    newToken = await this.createSessionToken(user);
                }
                const tokens = await this.createTokens({ token: newToken || sessionToken, user });
                await this.db.updateSession(session.id, infos, newToken);
                const result = {
                    sessionId: session.id,
                    tokens,
                    user,
                    infos,
                };
                await this.hooks.emit(server_hooks_1.ServerHooks.RefreshTokensSuccess, result);
                return result;
            }
            else {
                throw new accounts_error_1.AccountsJsError('Session is no longer valid', errors_1.RefreshTokensErrors.InvalidSession);
            }
        }
        catch (err) {
            await this.hooks.emit(server_hooks_1.ServerHooks.RefreshTokensError, err);
            throw err;
        }
    }
    /**
     * @description Refresh a user token.
     * @param {string} token - User session token.
     * @param {boolean} isImpersonated - Should be true if impersonating another user.
     * @param {User} user - The user object.
     * @returns {Promise<Tokens>} - Return a new accessToken and refreshToken.
     */
    async createTokens({ token, isImpersonated = false, user, }) {
        const { tokenConfigs } = this.options;
        const jwtData = {
            token,
            isImpersonated,
            userId: user.id,
        };
        const accessToken = (0, tokens_1.generateAccessToken)({
            payload: await this.createJwtPayload(jwtData, user),
            secret: this.getSecretOrPrivateKey(),
            config: tokenConfigs.accessToken,
        });
        const refreshToken = (0, tokens_1.generateRefreshToken)({
            secret: this.getSecretOrPrivateKey(),
            config: tokenConfigs.refreshToken,
        });
        return { accessToken, refreshToken };
    }
    /**
     * @description Logout a user and invalidate his session.
     * @param {string} accessToken - User access token.
     * @returns {Promise<void>} - Return a promise.
     * @throws {@link LogoutErrors}
     */
    async logout(accessToken) {
        try {
            const session = await this.findSessionByAccessToken(accessToken);
            if (session.valid) {
                await this.db.invalidateSession(session.id);
                await this.hooks.emit(server_hooks_1.ServerHooks.LogoutSuccess, {
                    session,
                    accessToken,
                });
            }
            else {
                throw new accounts_error_1.AccountsJsError('Session is no longer valid', errors_1.LogoutErrors.InvalidSession);
            }
        }
        catch (error) {
            await this.hooks.emit(server_hooks_1.ServerHooks.LogoutError, error);
            throw error;
        }
    }
    /**
     * @description Resume the current session associated to the access token. Will throw if the token
     * or the session is invalid.
     * If `useStatelessSession` is false the session validity will be checked against the database.
     * @param accessToken - User JWT access token.
     * @returns Return the user associated to the session.
     * @throws {@link ResumeSessionErrors}
     */
    async resumeSession(accessToken) {
        var _a, _b;
        try {
            if (!(0, validation_1.isString)(accessToken)) {
                throw new accounts_error_1.AccountsJsError('An accessToken is required', errors_1.ResumeSessionErrors.InvalidToken);
            }
            let sessionToken;
            let userId;
            try {
                const decodedAccessToken = jwt.verify(accessToken, this.getSecretOrPublicKey());
                sessionToken = decodedAccessToken.data.token;
                userId = decodedAccessToken.data.userId;
            }
            catch (err) {
                throw new accounts_error_1.AccountsJsError('Tokens are not valid', errors_1.ResumeSessionErrors.TokenVerificationFailed);
            }
            // If the session is stateful we check the validity of the token against the db
            let session = null;
            if (!this.options.useStatelessSession) {
                session = await this.db.findSessionByToken(sessionToken);
                if (!session) {
                    throw new accounts_error_1.AccountsJsError('Session not found', errors_1.ResumeSessionErrors.SessionNotFound);
                }
                if (!session.valid) {
                    throw new accounts_error_1.AccountsJsError('Invalid Session', errors_1.ResumeSessionErrors.InvalidSession);
                }
            }
            const user = await this.db.findUserById(userId);
            if (!user) {
                throw new accounts_error_1.AccountsJsError('User not found', errors_1.ResumeSessionErrors.UserNotFound);
            }
            await ((_b = (_a = this.options).resumeSessionValidator) === null || _b === void 0 ? void 0 : _b.call(_a, user, session));
            await this.hooks.emit(server_hooks_1.ServerHooks.ResumeSessionSuccess, { user, accessToken, session });
            return this.sanitizeUser(user);
        }
        catch (error) {
            await this.hooks.emit(server_hooks_1.ServerHooks.ResumeSessionError, error);
            throw error;
        }
    }
    /**
     * @description Find a session by his token.
     * @param {string} accessToken
     * @returns {Promise<Session>} - Return a session.
     * @throws {@link FindSessionByAccessTokenErrors}
     */
    async findSessionByAccessToken(accessToken) {
        if (!(0, validation_1.isString)(accessToken)) {
            throw new accounts_error_1.AccountsJsError('An accessToken is required', errors_1.FindSessionByAccessTokenErrors.InvalidToken);
        }
        let sessionToken;
        try {
            const decodedAccessToken = jwt.verify(accessToken, this.getSecretOrPublicKey());
            sessionToken = decodedAccessToken.data.token;
        }
        catch (err) {
            throw new accounts_error_1.AccountsJsError('Tokens are not valid', errors_1.FindSessionByAccessTokenErrors.TokenVerificationFailed);
        }
        const session = await this.db.findSessionByToken(sessionToken);
        if (!session) {
            throw new accounts_error_1.AccountsJsError('Session not found', errors_1.FindSessionByAccessTokenErrors.SessionNotFound);
        }
        return session;
    }
    /**
     * @description Find a user by his id.
     * @param {string} userId - User id.
     * @returns {Promise<Object>} - Return a user or null if not found.
     */
    findUserById(userId) {
        return this.db.findUserById(userId);
    }
    /**
     * @description Deactivate a user, the user will not be able to login until his account is reactivated.
     * @param {string} userId - User id.
     * @returns {Promise<void>} - Return a Promise.
     */
    async deactivateUser(userId) {
        return this.db.setUserDeactivated(userId, true);
    }
    /**
     * @description Activate a user.
     * @param {string} userId - User id.
     * @returns {Promise<void>} - Return a Promise.
     */
    async activateUser(userId) {
        return this.db.setUserDeactivated(userId, false);
    }
    prepareMail(to, token, user, pathFragment, emailTemplate, from) {
        if (this.options.prepareMail) {
            return this.options.prepareMail(to, token, user, pathFragment, emailTemplate, from);
        }
        return this.defaultPrepareEmail(to, token, user, pathFragment, emailTemplate, from);
    }
    sanitizeUser(user) {
        const { userObjectSanitizer } = this.options;
        const baseUser = this.options.useInternalUserObjectSanitizer
            ? this.internalUserSanitizer(user)
            : user;
        return userObjectSanitizer(baseUser);
    }
    internalUserSanitizer(user) {
        // Remove services from the user object
        const { 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        services, ...sanitizedUser } = user;
        return sanitizedUser;
    }
    defaultPrepareEmail(to, token, user, pathFragment, emailTemplate, from) {
        const tokenizedUrl = this.defaultCreateTokenizedUrl(pathFragment, token);
        return {
            from: emailTemplate.from || from,
            to,
            subject: emailTemplate.subject(user),
            text: emailTemplate.text(user, tokenizedUrl),
            html: emailTemplate.html && emailTemplate.html(user, tokenizedUrl),
        };
    }
    defaultCreateTokenizedUrl(pathFragment, token) {
        const siteUrl = this.options.siteUrl;
        return `${siteUrl}/${pathFragment}/${token}`;
    }
    async createSessionToken(user) {
        return this.options.tokenCreator
            ? this.options.tokenCreator.createToken(user)
            : (0, tokens_1.generateRandomToken)();
    }
    async createJwtPayload(data, user) {
        return this.options.createJwtPayload
            ? {
                ...(await this.options.createJwtPayload(data, user)),
                data,
            }
            : { data };
    }
    getSecretOrPublicKey() {
        return typeof this.options.tokenSecret === 'string'
            ? this.options.tokenSecret
            : this.options.tokenSecret.publicKey;
    }
    getSecretOrPrivateKey() {
        return typeof this.options.tokenSecret === 'string'
            ? this.options.tokenSecret
            : this.options.tokenSecret.privateKey;
    }
}
exports.AccountsServer = AccountsServer;
exports.default = AccountsServer;
//# sourceMappingURL=accounts-server.js.map