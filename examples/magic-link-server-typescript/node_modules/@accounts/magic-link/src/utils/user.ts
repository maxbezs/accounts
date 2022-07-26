import { User, TokenRecord } from '@maxbezs/types';

export const getUserLoginTokens = (user: User): TokenRecord[] => {
  return user.services?.magicLink?.loginTokens ?? [];
};
