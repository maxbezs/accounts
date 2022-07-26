import { User } from './user';
import { DatabaseInterface } from './database-interface';
export interface AuthenticationService<CustomUser extends User = User> {
    server: any;
    serviceName: string;
    setStore(store: DatabaseInterface): void;
    authenticate(params: any): Promise<CustomUser | null>;
}
