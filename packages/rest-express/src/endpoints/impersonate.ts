import * as express from 'express';
import { AccountsServer } from '@maxbezs/server';
import { ImpersonationUserIdentity } from '@maxbezs/types';
import { sendError } from '../utils/send-error';

export const impersonate =
  (accountsServer: AccountsServer) => async (req: express.Request, res: express.Response) => {
    try {
      const {
        impersonated,
        accessToken,
      }: {
        accessToken: string;
        impersonated: ImpersonationUserIdentity;
      } = req.body;
      const impersonateRes = await accountsServer.impersonate(accessToken, impersonated, req.infos);
      res.json(impersonateRes);
    } catch (err) {
      sendError(res, err);
    }
  };
