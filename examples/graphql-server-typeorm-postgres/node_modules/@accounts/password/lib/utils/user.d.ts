import { User, TokenRecord } from '@accounts/types';
export declare const getUserResetTokens: (user: User) => TokenRecord[];
export declare const getUserVerificationTokens: (user: User) => TokenRecord[];
