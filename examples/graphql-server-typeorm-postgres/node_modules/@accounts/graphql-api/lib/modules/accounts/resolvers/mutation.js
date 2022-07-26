"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const server_1 = require("@accounts/server");
exports.Mutation = {
    authenticate: async (_, args, ctx) => {
        const { serviceName, params } = args;
        const { injector, infos } = ctx;
        const authenticated = await injector
            .get(server_1.AccountsServer)
            .loginWithService(serviceName, params, infos);
        return authenticated;
    },
    verifyAuthentication: async (_, args, ctx) => {
        const { serviceName, params } = args;
        const { injector, infos } = ctx;
        const authenticated = await injector
            .get(server_1.AccountsServer)
            .authenticateWithService(serviceName, params, infos);
        return authenticated;
    },
    impersonate: async (_, args, ctx) => {
        const { accessToken, impersonated } = args;
        const { injector, infos } = ctx;
        const impersonateRes = await injector.get(server_1.AccountsServer).impersonate(accessToken, {
            userId: impersonated.userId,
            username: impersonated.username,
            email: impersonated.email,
        }, infos);
        // So ctx.user can be used in subsequent queries / mutations
        if (impersonateRes && impersonateRes.user && impersonateRes.tokens) {
            ctx.user = impersonateRes.user;
            ctx.authToken = impersonateRes.tokens.accessToken;
        }
        return impersonateRes;
    },
    logout: async (_, __, context) => {
        const { authToken, injector } = context;
        if (authToken) {
            await injector.get(server_1.AccountsServer).logout(authToken);
        }
        return null;
    },
    refreshTokens: async (_, args, ctx) => {
        const { accessToken, refreshToken } = args;
        const { injector, infos } = ctx;
        const refreshedSession = await injector
            .get(server_1.AccountsServer)
            .refreshTokens(accessToken, refreshToken, infos);
        return refreshedSession;
    },
};
//# sourceMappingURL=mutation.js.map