import { OAuthUser } from '@maxbezs/oauth';

export interface Configuration {
  key: string;
  secret: string;
  getRegistrationPayload?: (oauthUser: OAuthUser) => Promise<any>;
}
