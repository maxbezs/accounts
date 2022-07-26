"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsOAuthTwitter = void 0;
const tslib_1 = require("tslib");
const oauth = (0, tslib_1.__importStar)(require("oauth"));
class AccountsOAuthTwitter {
    constructor(config) {
        this.config = config;
        this.oauth = new oauth.OAuth('https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token', this.config.key, this.config.secret, '1.0A', null, 'HMAC-SHA1');
        this.getRegistrationPayload = config.getRegistrationPayload;
    }
    authenticate(params) {
        return new Promise((resolve, reject) => {
            this.oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true', params.access_token, params.access_token_secret, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    data = JSON.parse(data);
                    const user = {
                        id: data.id_str,
                        screenName: data.screen_name,
                        profilePicture: data.profile_image_url_https,
                        email: data.email,
                        accessToken: params.access_token,
                        accessTokenSecret: params.access_token_secret,
                    };
                    resolve(user);
                }
            });
        });
    }
}
exports.AccountsOAuthTwitter = AccountsOAuthTwitter;
//# sourceMappingURL=accounts-oauth-twitter.js.map