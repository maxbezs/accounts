import { LoginResult, Tokens, ImpersonationResult, User } from '@maxbezs/types';
import { TransportInterface } from './transport-interface';
import { AccountsClientOptions } from './types';
export declare class AccountsClient {
    transport: TransportInterface;
    private options;
    private storage;
    constructor(options: AccountsClientOptions, transport: TransportInterface);
    /**
     * Get the tokens from the storage
     */
    getTokens(original?: boolean): Promise<Tokens | null>;
    /**
     * Store the tokens in the storage
     */
    setTokens(tokens: Tokens, original?: boolean): Promise<void>;
    /**
     * Remove the tokens from the storage
     */
    clearTokens(original?: boolean): Promise<void>;
    /**
     * Authenticate the user with a specific service (not creating a session)
     */
    authenticateWithService(service: string, credentials: {
        [key: string]: any;
    }): Promise<boolean>;
    /**
     * Login the user with a specific service
     */
    loginWithService(service: string, credentials: {
        [key: string]: any;
    }): Promise<LoginResult>;
    /**
     * Refresh the user session
     * If the tokens have expired try to refresh them
     */
    refreshSession(force?: boolean): Promise<Tokens | null>;
    /**
     * Impersonate to another user.
     */
    impersonate(impersonated: {
        userId?: string;
        username?: string;
        email?: string;
    }): Promise<ImpersonationResult>;
    /**
     * Stop the user impersonation.
     */
    stopImpersonation(): Promise<void>;
    /**
     * Get the user infos
     */
    getUser(): Promise<User>;
    /**
     * Logout the user
     * Call the server to invalidate the tokens
     * Clean user local storage
     */
    logout(): Promise<void>;
    private getTokenKey;
}
