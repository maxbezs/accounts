import { AccountsServer } from '@accounts/server';
import { Tokens, User, LoginResult } from '@accounts/types';
import { Request, Response, NextFunction } from 'express';
import 'express-session';
export interface AccountsSessionOptions {
    user?: {
        name: string;
        resolve?: (tokens: Tokens, request: Request, rawUser?: User) => User | Promise<User>;
    };
    name?: string;
}
export declare class AccountsSession {
    private accountsServer;
    private options;
    constructor(accountsServer: AccountsServer, options?: AccountsSessionOptions);
    middleware(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    destroy(req: Request): Promise<void>;
    get(req?: Request): Tokens | undefined;
    renew(req: Request): Promise<LoginResult | undefined>;
    set(req: Request, tokens: Tokens): void;
    clear(req: Request): void;
}
export default AccountsSession;
