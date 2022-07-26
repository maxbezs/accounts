import { User, DatabaseInterface, AuthenticationService, LoginUserMagicLinkService, TokenRecord } from '@accounts/types';
import { AccountsServer } from '@accounts/server';
import { ErrorMessages } from './types';
export interface AccountsMagicLinkOptions {
    /**
     * Accounts token module errors
     */
    errors?: ErrorMessages;
    /**
     * The number of milliseconds from when a link with a login token is sent until token expires and user can't login with it.
     * Defaults to 15 minutes.
     */
    loginTokenExpiration?: number;
}
export default class AccountsMagicLink<CustomUser extends User = User> implements AuthenticationService {
    serviceName: string;
    server: AccountsServer;
    private options;
    private db;
    constructor(options?: AccountsMagicLinkOptions);
    setStore(store: DatabaseInterface<CustomUser>): void;
    requestMagicLinkEmail(email: string): Promise<void>;
    authenticate(params: LoginUserMagicLinkService): Promise<CustomUser>;
    isTokenExpired(tokenRecord: TokenRecord, expiryDate: number): boolean;
    private magicLinkAuthenticator;
}
