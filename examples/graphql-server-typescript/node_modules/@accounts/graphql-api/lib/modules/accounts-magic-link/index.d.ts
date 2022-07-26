import { AccountsServer } from '@accounts/server';
import { AccountsPassword } from '@accounts/password';
import { AccountsMagicLink } from '@accounts/magic-link';
import { GraphQLModule } from '@graphql-modules/core';
import { AccountsRequest } from '../accounts';
export interface AccountsMagicLinkModuleConfig {
    accountsServer: AccountsServer;
    accountsPassword: AccountsPassword;
    accountsMagicLink: AccountsMagicLink;
    rootMutationName?: string;
    extendTypeDefs?: boolean;
    withSchemaDefinition?: boolean;
    headerName?: string;
    userAsInterface?: boolean;
    excludeAddUserInContext?: boolean;
}
export declare const AccountsMagicLinkModule: GraphQLModule<AccountsMagicLinkModuleConfig, AccountsRequest>;
