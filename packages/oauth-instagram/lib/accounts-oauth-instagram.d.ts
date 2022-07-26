import { OAuthProvider, OAuthUser } from '@accounts/oauth';
import { Configuration } from './types/configuration';
export declare class AccountsOAuthInstagram implements OAuthProvider {
    getRegistrationPayload?: (oauthUser: OAuthUser) => Promise<any>;
    constructor(config?: Configuration);
    authenticate(params: any): Promise<{
        id: any;
        username: any;
        profilePicture: any;
        accessToken: any;
    }>;
}
