"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPassword = void 0;
const server_1 = require("@accounts/server");
const password_1 = require("@accounts/password");
const send_error_1 = require("../../utils/send-error");
const registerPassword = (accountsServer) => async (req, res) => {
    try {
        const { user } = req.body;
        const accountsPassword = accountsServer.getServices().password;
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
                return res.json({});
            }
            throw error;
        }
        if (!accountsServer.options.enableAutologin) {
            return res.json(accountsServer.options.ambiguousErrorMessages
                ? {}
                : {
                    userId,
                });
        }
        // When initializing AccountsServer we check that enableAutologin and ambiguousErrorMessages options
        // are not enabled at the same time
        const createdUser = await accountsServer.findUserById(userId);
        // If we are here - user must be created successfully
        // Explicitly saying this to Typescript compiler
        const loginResult = await accountsServer.loginWithUser(createdUser, req.infos);
        return res.json({
            userId,
            loginResult,
        });
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.registerPassword = registerPassword;
//# sourceMappingURL=register.js.map