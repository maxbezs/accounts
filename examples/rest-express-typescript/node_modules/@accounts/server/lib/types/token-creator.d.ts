import { User } from '@maxbezs/types';
export interface TokenCreator {
    createToken(user: User): Promise<string>;
}
