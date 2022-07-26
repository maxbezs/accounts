import { AccountsClient, TransportInterface } from '@accounts/client';
import { CreateUser, ImpersonationResult, LoginResult, User, CreateUserResult } from '@accounts/types';
import { DocumentNode } from 'graphql/language';
export interface AuthenticateParams {
    [key: string]: string | object;
}
export interface OptionsType {
    graphQLClient: any;
    userFieldsFragment?: DocumentNode;
}
export default class GraphQLClient implements TransportInterface {
    client: AccountsClient;
    private options;
    constructor(options: OptionsType);
    /**
     * Create a user with basic user info
     *
     * @param {CreateUser} user user object
     * @returns {Promise<CreateUserResult>} contains user's ID and LoginResult object if autologin is enabled
     * @memberof GraphQLClient
     */
    createUser(user: CreateUser): Promise<CreateUserResult>;
    /**
     * @inheritDoc
     */
    authenticateWithService(service: string, authenticateParams: {
        [key: string]: string | object;
    }): Promise<boolean>;
    /**
     * @inheritDoc
     */
    loginWithService(service: string, authenticateParams: AuthenticateParams): Promise<LoginResult>;
    /**
     * @inheritDoc
     */
    getUser(): Promise<User>;
    /**
     * @inheritDoc
     */
    logout(): Promise<void>;
    /**
     * @inheritDoc
     */
    refreshTokens(accessToken: string, refreshToken: string): Promise<LoginResult>;
    /**
     * @inheritDoc
     */
    verifyEmail(token: string): Promise<void>;
    /**
     * @inheritDoc
     */
    sendResetPasswordEmail(email: string): Promise<void>;
    /**
     * @inheritDoc
     */
    sendVerificationEmail(email: string): Promise<void>;
    /**
     * @inheritDoc
     */
    resetPassword(token: string, newPassword: string): Promise<LoginResult | null>;
    /**
     * @inheritDoc
     */
    addEmail(newEmail: string): Promise<void>;
    /**
     * @inheritDoc
     */
    changePassword(oldPassword: string, newPassword: string): Promise<void>;
    /**
     * @inheritDoc
     */
    getTwoFactorSecret(): Promise<any>;
    /**
     * @inheritDoc
     */
    twoFactorSet(secret: any, code: string): Promise<void>;
    /**
     * @inheritDoc
     */
    twoFactorUnset(code: string): Promise<void>;
    /**
     * @inheritDoc
     */
    impersonate(token: string, impersonated: {
        username?: string;
        userId?: string;
        email?: string;
    }): Promise<ImpersonationResult>;
    private mutate;
    private query;
    /**
     * @inheritDoc
     */
    requestMagicLinkEmail(email: string): Promise<void>;
}
