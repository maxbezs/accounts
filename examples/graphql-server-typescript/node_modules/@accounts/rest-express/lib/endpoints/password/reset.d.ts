import * as express from 'express';
import { AccountsServer } from '@accounts/server';
export declare const resetPassword: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response) => Promise<void>;
export declare const sendResetPasswordEmail: (accountsServer: AccountsServer) => (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
