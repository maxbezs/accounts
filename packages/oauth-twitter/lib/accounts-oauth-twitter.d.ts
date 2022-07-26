import { Configuration } from './types/configuration';
import { OAuthProvider, OAuthUser } from '@accounts/oauth';
export declare class AccountsOAuthTwitter implements OAuthProvider {
    private config;
    private oauth;
    getRegistrationPayload?: (oauthUser: OAuthUser) => Promise<any>;
    constructor(config: Configuration);
    authenticate(params: any): Promise<OAuthUser>;
}
