import { GraphQLModule } from '@graphql-modules/core';
import { AccountsPassword } from '@accounts/password';
import { AccountsServer } from '@accounts/server';
import { AccountsRequest } from '../accounts';
export interface AccountsPasswordModuleConfig {
    accountsServer: AccountsServer;
    accountsPassword: AccountsPassword;
    rootQueryName?: string;
    rootMutationName?: string;
    extendTypeDefs?: boolean;
    withSchemaDefinition?: boolean;
    headerName?: string;
    userAsInterface?: boolean;
    excludeAddUserInContext?: boolean;
}
export declare const AccountsPasswordModule: GraphQLModule<AccountsPasswordModuleConfig, AccountsRequest>;
