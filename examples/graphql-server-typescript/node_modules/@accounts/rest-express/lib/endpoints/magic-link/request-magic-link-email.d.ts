import * as express from 'express';
import { AccountsServer } from '@accounts/server';
export declare const requestMagicLinkEmail: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
