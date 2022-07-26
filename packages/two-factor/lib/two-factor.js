"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactor = void 0;
const speakeasy_1 = require("@levminer/speakeasy");
const errors_1 = require("./errors");
const utils_1 = require("./utils");
const defaultOptions = {
    secretLength: 20,
    window: 0,
    errors: errors_1.errors,
};
class TwoFactor {
    constructor(options = {}) {
        this.serviceName = 'two-factor';
        this.options = { ...defaultOptions, ...options };
    }
    verifyTOTPCode(secret, code) {
        try {
            const verified = speakeasy_1.totp.verify({
                secret,
                encoding: 'base32',
                token: code,
                window: this.options.window,
            });
            if (verified)
                return true;
        }
        catch (e) {
            //
        }
        return false;
    }
    /**
     * Set two factor store
     */
    setStore(store) {
        this.db = store;
    }
    /**
     * Authenticate a user with a 2fa code
     */
    async authenticate(user, code) {
        if (!code) {
            throw new Error(this.options.errors.codeRequired);
        }
        const twoFactorService = (0, utils_1.getUserTwoFactorService)(user);
        // If user does not have 2fa set return error
        if (!twoFactorService) {
            throw new Error(this.options.errors.userTwoFactorNotSet);
        }
        if (!this.verifyTOTPCode(twoFactorService.secret.base32, code)) {
            throw new Error(this.options.errors.codeDidNotMatch);
        }
    }
    /**
     * Generate a new two factor secret
     */
    getNewAuthSecret() {
        return (0, speakeasy_1.generateSecret)({
            length: this.options.secretLength,
            name: this.options.appName,
        });
    }
    /**
     * Verify the code is correct
     * Add the code to the user profile
     * Throw if user already have 2fa enabled
     */
    async set(userId, secret, code) {
        if (!code) {
            throw new Error(this.options.errors.codeRequired);
        }
        const user = await this.db.findUserById(userId);
        if (!user) {
            throw new Error(this.options.errors.userNotFound);
        }
        let twoFactorService = (0, utils_1.getUserTwoFactorService)(user);
        // If user already have 2fa return error
        if (twoFactorService) {
            throw new Error(this.options.errors.userTwoFactorAlreadySet);
        }
        if (this.verifyTOTPCode(secret.base32, code)) {
            twoFactorService = {
                secret,
            };
            await this.db.setService(userId, this.serviceName, twoFactorService);
        }
        else {
            throw new Error(this.options.errors.codeDidNotMatch);
        }
    }
    /**
     * Remove two factor for a user
     */
    async unset(userId, code) {
        if (!code) {
            throw new Error(this.options.errors.codeRequired);
        }
        const user = await this.db.findUserById(userId);
        if (!user) {
            throw new Error(this.options.errors.userNotFound);
        }
        const twoFactorService = (0, utils_1.getUserTwoFactorService)(user);
        // If user does not have 2fa set return error
        if (!twoFactorService) {
            throw new Error(this.options.errors.userTwoFactorNotSet);
        }
        if (this.verifyTOTPCode(twoFactorService.secret.base32, code)) {
            await this.db.unsetService(userId, this.serviceName);
        }
        else {
            throw new Error(this.options.errors.codeDidNotMatch);
        }
    }
}
exports.TwoFactor = TwoFactor;
//# sourceMappingURL=two-factor.js.map