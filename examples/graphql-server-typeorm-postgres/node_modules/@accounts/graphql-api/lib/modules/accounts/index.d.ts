/// <reference types="node" />
import { GraphQLModule } from '@graphql-modules/core';
import { User, ConnectionInformations } from '@accounts/types';
import { AccountsServer } from '@accounts/server';
import { IncomingMessage } from 'http';
export interface AccountsRequest {
    req: IncomingMessage;
    connection?: any;
}
export interface AccountsModuleConfig {
    accountsServer: AccountsServer;
    rootQueryName?: string;
    rootMutationName?: string;
    extendTypeDefs?: boolean;
    withSchemaDefinition?: boolean;
    headerName?: string;
    userAsInterface?: boolean;
    excludeAddUserInContext?: boolean;
}
export interface AccountsModuleContext<IUser = User> {
    authToken?: string;
    user?: IUser;
    userId?: string;
    userAgent: string | null;
    ip: string | null;
    infos: ConnectionInformations;
}
export declare const AccountsModule: GraphQLModule<AccountsModuleConfig, AccountsRequest, AccountsModuleContext>;
