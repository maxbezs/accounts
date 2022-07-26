import { AccountsTypeorm } from './typeorm';
import { User } from './entity/User';
import { UserEmail } from './entity/UserEmail';
import { UserService } from './entity/UserService';
import { UserSession } from './entity/UserSession';
declare const entities: (typeof UserService | typeof User | typeof UserEmail | typeof UserSession)[];
export { AccountsTypeorm, User, UserEmail, UserService, UserSession, entities };
export default AccountsTypeorm;
