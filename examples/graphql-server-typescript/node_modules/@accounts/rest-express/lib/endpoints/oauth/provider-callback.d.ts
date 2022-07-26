import * as express from 'express';
import { AccountsServer } from '@accounts/server';
import { AccountsExpressOptions } from '../../types';
export declare const providerCallback: (accountsServer: AccountsServer, options?: AccountsExpressOptions | undefined) => (req: express.Request, res: express.Response) => Promise<void>;
