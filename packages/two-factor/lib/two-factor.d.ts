import { GeneratedSecret } from '@levminer/speakeasy';
import { User, DatabaseInterface } from '@maxbezs/types';
import { AccountsTwoFactorOptions } from './types';
export declare class TwoFactor {
    private options;
    private db;
    private serviceName;
    private verifyTOTPCode;
    constructor(options?: AccountsTwoFactorOptions);
    /**
     * Set two factor store
     */
    setStore(store: DatabaseInterface): void;
    /**
     * Authenticate a user with a 2fa code
     */
    authenticate(user: User, code: string): Promise<void>;
    /**
     * Generate a new two factor secret
     */
    getNewAuthSecret(): GeneratedSecret;
    /**
     * Verify the code is correct
     * Add the code to the user profile
     * Throw if user already have 2fa enabled
     */
    set(userId: string, secret: GeneratedSecret, code: string): Promise<void>;
    /**
     * Remove two factor for a user
     */
    unset(userId: string, code: string): Promise<void>;
}
