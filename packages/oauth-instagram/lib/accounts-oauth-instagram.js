"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsOAuthInstagram = void 0;
const tslib_1 = require("tslib");
const request_promise_1 = (0, tslib_1.__importDefault)(require("request-promise"));
class AccountsOAuthInstagram {
    constructor(config) {
        this.getRegistrationPayload = config === null || config === void 0 ? void 0 : config.getRegistrationPayload;
    }
    async authenticate(params) {
        let data = await (0, request_promise_1.default)(`https://api.instagram.com/v1/users/self/?access_token=${params.access_token}`);
        data = JSON.parse(data).data;
        return {
            id: data.id,
            username: data.username,
            profilePicture: data.profile_picture,
            accessToken: params.access_token,
        };
    }
}
exports.AccountsOAuthInstagram = AccountsOAuthInstagram;
//# sourceMappingURL=accounts-oauth-instagram.js.map