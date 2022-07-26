"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const magic_link_1 = require("@accounts/magic-link");
const server_1 = require("@accounts/server");
exports.Mutation = {
    requestMagicLinkEmail: async (_, { email }, { injector }) => {
        const accountsServer = injector.get(server_1.AccountsServer);
        const accountsMagicLink = injector.get(magic_link_1.AccountsMagicLink);
        try {
            await accountsMagicLink.requestMagicLinkEmail(email);
        }
        catch (error) {
            // If ambiguousErrorMessages is true,
            // to prevent user enumeration we fail silently in case there is no user attached to this email
            if (accountsServer.options.ambiguousErrorMessages &&
                error instanceof server_1.AccountsJsError &&
                error.code === magic_link_1.RequestMagicLinkEmailErrors.UserNotFound) {
                return null;
            }
            throw error;
        }
        return null;
    },
};
//# sourceMappingURL=mutation.js.map