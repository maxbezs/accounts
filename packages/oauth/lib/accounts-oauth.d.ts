import { User, DatabaseInterface, AuthenticationService } from '@accounts/types';
import { AccountsServer } from '@accounts/server';
import { OAuthOptions } from './types/oauth-options';
export declare class AccountsOauth implements AuthenticationService {
    server: AccountsServer;
    serviceName: string;
    private db;
    private options;
    constructor(options: OAuthOptions);
    setStore(store: DatabaseInterface): void;
    authenticate(params: any): Promise<User | null>;
    unlink(userId: string, provider: string): Promise<void>;
}
