import { AccountsClient } from '@accounts/client';
import { LoginResult, LoginUserMagicLinkService } from '@accounts/types';
export declare class AccountsClientMagicLink {
    private client;
    constructor(client: AccountsClient);
    /**
     * Log the user in with a token.
     */
    login(user: LoginUserMagicLinkService): Promise<LoginResult>;
    /**
     * Request a new login link.
     * @param {string} email - The email address to send a login link.
     */
    requestMagicLinkEmail(email: string): Promise<void>;
}
