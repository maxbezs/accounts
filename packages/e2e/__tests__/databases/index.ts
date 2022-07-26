import { DatabaseInterface } from '@maxbezs/types';

export interface DatabaseTestInterface {
  accountsDatabase: DatabaseInterface;

  start: () => Promise<void>;
  stop: () => Promise<void>;
}
