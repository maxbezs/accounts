import * as express from 'express';
import { AccountsServer } from '@accounts/server';
export declare const twoFactorSecret: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response) => Promise<void>;
export declare const twoFactorSet: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response) => Promise<void>;
export declare const twoFactorUnset: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response) => Promise<void>;
