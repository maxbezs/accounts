import { UserService } from './UserService';
import { UserEmail } from './UserEmail';
import { UserSession } from './UserSession';
export declare class User {
    id: string;
    username: string;
    allServices: UserService[];
    emails: UserEmail[];
    sessions: UserSession[];
    deactivated: boolean;
    createdAt: Date;
    updatedAt: Date;
    services: any;
    getServices(): Promise<void>;
}
