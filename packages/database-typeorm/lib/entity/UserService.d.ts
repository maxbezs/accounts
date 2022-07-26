import { User } from './User';
export declare class UserService {
    id: string;
    user: User;
    name: string;
    token?: string;
    options: {
        bcrypt: string;
    } | any;
    serviceId: string;
    userId: string;
}
