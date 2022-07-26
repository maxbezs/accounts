"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const password_1 = require("@accounts/password");
const server_1 = require("@accounts/server");
exports.Mutation = {
    addEmail: async (_, { newEmail }, { user, injector }) => {
        if (!(user && user.id)) {
            throw new Error('Unauthorized');
        }
        const userId = user.id;
        await injector.get(password_1.AccountsPassword).addEmail(userId, newEmail);
        return null;
    },
    changePassword: async (_, { oldPassword, newPassword }, { user, injector }) => {
        if (!(user && user.id)) {
            throw new Error('Unauthorized');
        }
        const userId = user.id;
        await injector.get(password_1.AccountsPassword).changePassword(userId, oldPassword, newPassword);
        return null;
    },
    createUser: async (_, { user }, ctx) => {
        const { injector, infos } = ctx;
        const accountsServer = injector.get(server_1.AccountsServer);
        const accountsPassword = injector.get(password_1.AccountsPassword);
        let userId;
        try {
            userId = await accountsPassword.createUser(user);
        }
        catch (error) {
            // If ambiguousErrorMessages is true we obfuscate the email or username already exist error
            // to prevent user enumeration during user creation
            if (accountsServer.options.ambiguousErrorMessages &&
                error instanceof server_1.AccountsJsError &&
                (error.code === password_1.CreateUserErrors.EmailAlreadyExists ||
                    error.code === password_1.CreateUserErrors.UsernameAlreadyExists)) {
                return {};
            }
            throw error;
        }
        if (!accountsServer.options.enableAutologin) {
            return {
                userId: accountsServer.options.ambiguousErrorMessages ? null : userId,
            };
        }
        // When initializing AccountsServer we check that enableAutologin and ambiguousErrorMessages options
        // are not enabled at the same time
        const createdUser = await accountsServer.findUserById(userId);
        // If we are here - user must be created successfully
        // Explicitly saying this to Typescript compiler
        const loginResult = await accountsServer.loginWithUser(createdUser, infos);
        return {
            userId,
            loginResult,
        };
    },
    twoFactorSet: async (_, { code, secret }, { user, injector }) => {
        // Make sure user is logged in
        if (!(user && user.id)) {
            throw new Error('Unauthorized');
        }
        const userId = user.id;
        await injector.get(password_1.AccountsPassword).twoFactor.set(userId, secret, code);
        return null;
    },
    twoFactorUnset: async (_, { code }, { user, injector }) => {
        // Make sure user is logged in
        if (!(user && user.id)) {
            throw new Error('Unauthorized');
        }
        const userId = user.id;
        await injector.get(password_1.AccountsPassword).twoFactor.unset(userId, code);
        return null;
    },
    resetPassword: async (_, { token, newPassword }, { injector, infos }) => {
        return injector.get(password_1.AccountsPassword).resetPassword(token, newPassword, infos);
    },
    sendResetPasswordEmail: async (_, { email }, { injector }) => {
        const accountsServer = injector.get(server_1.AccountsServer);
        const accountsPassword = injector.get(password_1.AccountsPassword);
        try {
            await accountsPassword.sendResetPasswordEmail(email);
        }
        catch (error) {
            // If ambiguousErrorMessages is true,
            // to prevent user enumeration we fail silently in case there is no user attached to this email
            if (accountsServer.options.ambiguousErrorMessages &&
                error instanceof server_1.AccountsJsError &&
                error.code === password_1.SendResetPasswordEmailErrors.UserNotFound) {
                return null;
            }
            throw error;
        }
        return null;
    },
    verifyEmail: async (_, { token }, { injector }) => {
        await injector.get(password_1.AccountsPassword).verifyEmail(token);
        return null;
    },
    sendVerificationEmail: async (_, { email }, { injector }) => {
        const accountsServer = injector.get(server_1.AccountsServer);
        const accountsPassword = injector.get(password_1.AccountsPassword);
        try {
            await accountsPassword.sendVerificationEmail(email);
        }
        catch (error) {
            // If ambiguousErrorMessages is true,
            // to prevent user enumeration we fail silently in case there is no user attached to this email
            if (accountsServer.options.ambiguousErrorMessages &&
                error instanceof server_1.AccountsJsError &&
                error.code === password_1.SendVerificationEmailErrors.UserNotFound) {
                return null;
            }
            throw error;
        }
        return null;
    },
};
//# sourceMappingURL=mutation.js.map