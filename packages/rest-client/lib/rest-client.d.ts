import { TransportInterface, AccountsClient } from '@accounts/client';
import { User, LoginResult, CreateUser, ImpersonationUserIdentity, ImpersonationResult, CreateUserResult } from '@accounts/types';
export interface OptionsType {
    apiHost: string;
    rootPath: string;
}
export declare class RestClient implements TransportInterface {
    client: AccountsClient;
    private options;
    constructor(options: OptionsType);
    fetch(route: string, args: object, customHeaders?: object): Promise<any>;
    authFetch(route: string, args: object, customHeaders?: object): Promise<any>;
    authenticateWithService(provider: string, data: any, customHeaders?: object): Promise<boolean>;
    loginWithService(provider: string, data: any, customHeaders?: object): Promise<LoginResult>;
    impersonate(accessToken: string, impersonated: ImpersonationUserIdentity, customHeaders?: object): Promise<ImpersonationResult>;
    refreshTokens(accessToken: string, refreshToken: string, customHeaders?: object): Promise<LoginResult>;
    logout(customHeaders?: object): Promise<void>;
    getUser(customHeaders?: object): Promise<User>;
    createUser(user: CreateUser, customHeaders?: object): Promise<CreateUserResult>;
    resetPassword(token: string, newPassword: string, customHeaders?: object): Promise<LoginResult | null>;
    verifyEmail(token: string, customHeaders?: object): Promise<void>;
    sendVerificationEmail(email: string, customHeaders?: object): Promise<void>;
    sendResetPasswordEmail(email: string, customHeaders?: object): Promise<void>;
    addEmail(newEmail: string, customHeaders?: object): Promise<void>;
    changePassword(oldPassword: string, newPassword: string, customHeaders?: object): Promise<void>;
    getTwoFactorSecret(customHeaders?: object): Promise<any>;
    twoFactorSet(secret: any, code: string, customHeaders?: object): Promise<void>;
    twoFactorUnset(code: string, customHeaders?: object): Promise<void>;
    requestMagicLinkEmail(email: string, customHeaders?: object): Promise<void>;
}
export default RestClient;
