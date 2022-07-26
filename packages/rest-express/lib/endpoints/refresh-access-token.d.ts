import * as express from 'express';
import { AccountsServer } from '@accounts/server';
export declare const refreshAccessToken: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response) => Promise<void>;
