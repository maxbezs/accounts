import * as express from 'express';
import { AccountsServer } from '@accounts/server';
export declare const changePassword: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response) => Promise<void>;
