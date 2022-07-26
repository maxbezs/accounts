import { OAuthUser } from '@maxbezs/oauth';

export interface Configuration {
  getRegistrationPayload?: (oauthUser: OAuthUser) => Promise<any>;
}
