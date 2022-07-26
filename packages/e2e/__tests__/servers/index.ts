import { AccountsServer } from '@maxbezs/server';
import { AccountsPassword } from '@maxbezs/password';
import { DatabaseInterface } from '@maxbezs/types';
import { AccountsClient } from '@maxbezs/client';
import { AccountsClientPassword } from '@maxbezs/client-password';
import { ServerGraphqlTest } from './server-graphql';
import { ServerRestTest } from './server-rest';

export const servers: {
  [key: string]: ServerTestInterface;
} = {
  'server-graphql': new ServerGraphqlTest(),
  'server-rest': new ServerRestTest(),
};

export interface ServerTestInterface {
  port: number;
  /**
   * The server
   */
  accountsServer: AccountsServer;
  /**
   * The server password service
   */
  accountsPassword: AccountsPassword;
  /**
   * The server database
   */
  accountsDatabase: DatabaseInterface;

  /**
   * The client
   */
  accountsClient: AccountsClient;
  /**
   * The client password service
   */
  accountsClientPassword: AccountsClientPassword;

  emails: any[];

  /**
   * - create server
   * - setup databases connections
   * - cleanup database
   * - initiate the accounts-js server and the services
   */
  start: () => Promise<void>;
  /**
   * - stop server
   * - stop databases connection
   * - cleanup database
   */
  stop: () => Promise<void>;
}
