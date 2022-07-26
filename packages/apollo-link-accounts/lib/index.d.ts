import { ApolloLink } from '@apollo/client';
import { AccountsClient } from '@accounts/client';
declare type AccountsClientFactory = () => AccountsClient | Promise<AccountsClient>;
export declare const accountsLink: (accountsClientFactory: AccountsClientFactory) => ApolloLink;
export {};
