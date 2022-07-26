import { LoginUserIdentity } from '../../login-user-identity';
export interface LoginUserPasswordService {
    user: string | LoginUserIdentity;
    password: string;
    code?: string;
}
