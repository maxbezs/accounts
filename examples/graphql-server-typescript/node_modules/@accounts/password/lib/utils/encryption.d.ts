export declare const bcryptPassword: (password: string) => Promise<string>;
export declare const verifyPassword: (password: string, hash: string) => Promise<boolean>;
