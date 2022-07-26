import * as jwt from 'jsonwebtoken';
/**
 * Generate a random token string
 */
export declare const generateRandomToken: (length?: number) => string;
export declare const generateAccessToken: ({ secret, payload, config, }: {
    secret: jwt.Secret;
    payload?: any;
    config: jwt.SignOptions;
}) => string;
export declare const generateRefreshToken: ({ secret, payload, config, }: {
    secret: jwt.Secret;
    payload?: any;
    config: jwt.SignOptions;
}) => string;
