import { DatabaseInterface, DatabaseInterfaceSessions } from '@maxbezs/types';
export interface Configuration {
    userStorage: DatabaseInterface;
    sessionStorage: DatabaseInterface | DatabaseInterfaceSessions;
}
