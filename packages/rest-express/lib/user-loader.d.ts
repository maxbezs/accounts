import * as express from 'express';
import { AccountsServer } from '@accounts/server';
export declare const userLoader: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response, next: any) => Promise<void>;
