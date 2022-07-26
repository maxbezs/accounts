import * as express from 'express';
import { AccountsServer } from '@accounts/server';
import { AccountsExpressOptions } from './types';
declare const accountsExpress: (accountsServer: AccountsServer, options?: AccountsExpressOptions) => express.Router;
export default accountsExpress;
