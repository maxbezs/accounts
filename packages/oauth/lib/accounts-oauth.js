"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsOauth = void 0;
const server_1 = require("@accounts/server");
const getRegistrationPayloadDefault = async (oauthUser) => {
    return {
        email: oauthUser.email,
    };
};
class AccountsOauth {
    constructor(options) {
        this.serviceName = 'oauth';
        this.options = options;
    }
    setStore(store) {
        this.db = store;
    }
    async authenticate(params) {
        if (!params.provider || !this.options[params.provider]) {
            throw new Error('Invalid provider');
        }
        const userProvider = this.options[params.provider];
        if (typeof userProvider.authenticate !== 'function') {
            throw new Error('Invalid provider');
        }
        const oauthUser = await userProvider.authenticate(params);
        let user = await this.db.findUserByServiceId(params.provider, oauthUser.id);
        if (!user && oauthUser.email) {
            user = await this.db.findUserByEmail(oauthUser.email);
        }
        if (!user) {
            try {
                const userData = await (userProvider.getRegistrationPayload || getRegistrationPayloadDefault)(oauthUser);
                const userId = await this.db.createUser(userData);
                user = (await this.db.findUserById(userId));
                if (this.server) {
                    await this.server.getHooks().emit(server_1.ServerHooks.CreateUserSuccess, user);
                }
            }
            catch (e) {
                if (this.server) {
                    await this.server.getHooks().emit(server_1.ServerHooks.CreateUserError, user);
                }
                throw e;
            }
        }
        await this.db.setService(user.id, params.provider, oauthUser);
        return user;
    }
    async unlink(userId, provider) {
        if (!provider || !this.options[provider]) {
            throw new Error('Invalid provider');
        }
        await this.db.setService(userId, provider, null);
    }
}
exports.AccountsOauth = AccountsOauth;
//# sourceMappingURL=accounts-oauth.js.map