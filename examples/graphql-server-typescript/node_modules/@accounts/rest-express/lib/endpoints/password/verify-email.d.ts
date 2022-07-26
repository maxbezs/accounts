import * as express from 'express';
import { AccountsServer } from '@accounts/server';
export declare const verifyEmail: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response) => Promise<void>;
export declare const sendVerificationEmail: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
