"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const password_1 = require("@accounts/password");
exports.Query = {
    twoFactorSecret: async (_, args, ctx) => {
        const { user, injector } = ctx;
        // Make sure user is logged in
        if (!(user && user.id)) {
            throw new Error('Unauthorized');
        }
        // https://github.com/speakeasyjs/speakeasy/blob/master/index.js#L517
        const secret = injector.get(password_1.AccountsPassword).twoFactor.getNewAuthSecret();
        return secret;
    },
};
//# sourceMappingURL=query.js.map