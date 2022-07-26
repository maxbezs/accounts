import { ModuleSessionInfo } from '@graphql-modules/core';
import { AccountsRequest } from '../modules';
export declare const context: (moduleName: string) => ({ req, connection }: AccountsRequest, _: any, { injector }: ModuleSessionInfo) => Promise<any>;
