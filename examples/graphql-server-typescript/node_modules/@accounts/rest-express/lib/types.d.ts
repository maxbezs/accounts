import * as express from 'express';
import { LoginResult } from '@accounts/types';
export declare type OAuthSuccessCallback = (req: express.Request, res: express.Response, login: LoginResult) => void;
export declare type OAuthErrorCallback = (req: express.Request, res: express.Response, error: any) => void;
export declare type TransformOAuthResponse<T = LoginResult> = (login: LoginResult) => T;
export interface AccountsExpressOptions {
    path?: string;
    onOAuthSuccess?: OAuthSuccessCallback;
    onOAuthError?: OAuthErrorCallback;
    transformOAuthResponse?: TransformOAuthResponse;
}
