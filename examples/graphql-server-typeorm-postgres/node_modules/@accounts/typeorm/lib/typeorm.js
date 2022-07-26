"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsTypeorm = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const UserEmail_1 = require("./entity/UserEmail");
const UserService_1 = require("./entity/UserService");
const UserSession_1 = require("./entity/UserSession");
const defaultOptions = {
    userEntity: User_1.User,
    userEmailEntity: UserEmail_1.UserEmail,
    userServiceEntity: UserService_1.UserService,
    userSessionEntity: UserSession_1.UserSession,
};
class AccountsTypeorm {
    constructor(options) {
        this.userRepository = null;
        this.emailRepository = null;
        this.serviceRepository = null;
        this.sessionRepository = null;
        this.options = { ...defaultOptions, ...options };
        const { connection, connectionName, userEntity, userEmailEntity, userServiceEntity, userSessionEntity, } = this.options;
        const setRepositories = () => {
            if (connection) {
                this.userRepository = connection.getRepository(userEntity);
                this.emailRepository = connection.getRepository(userEmailEntity);
                this.serviceRepository = connection.getRepository(userServiceEntity);
                this.sessionRepository = connection.getRepository(userSessionEntity);
            }
            else {
                this.userRepository = (0, typeorm_1.getRepository)(userEntity, connectionName);
                this.emailRepository = (0, typeorm_1.getRepository)(userEmailEntity, connectionName);
                this.serviceRepository = (0, typeorm_1.getRepository)(userServiceEntity, connectionName);
                this.sessionRepository = (0, typeorm_1.getRepository)(userSessionEntity, connectionName);
            }
        };
        // direct or lazy support
        if (connection && !connection.isConnected) {
            connection.connect().then(setRepositories);
        }
        else {
            setRepositories();
        }
    }
    async findUserByEmail(email) {
        const userEmail = await this.emailRepository.findOne({
            where: { address: email.toLocaleLowerCase() },
            cache: this.options.cache,
        });
        if (userEmail) {
            return this.findUserById(userEmail.userId);
        }
        return null;
    }
    async findUserByUsername(username) {
        const user = await this.userRepository.findOne({
            where: { username },
            cache: this.options.cache,
        });
        if (user) {
            return user;
        }
        return null;
    }
    async findUserById(userId) {
        const user = await this.userRepository.findOne(userId, {
            cache: this.options.cache,
        });
        if (!user) {
            // throw new Error('User not found');
            return null;
        }
        return user;
    }
    async findUserByResetPasswordToken(token) {
        const service = await this.serviceRepository.findOne({
            where: {
                name: 'password.reset',
                token,
            },
            cache: this.options.cache,
        });
        if (service) {
            return this.findUserById(service.userId);
        }
        return null;
    }
    async findUserByEmailVerificationToken(token) {
        const service = await this.serviceRepository.findOne({
            where: {
                name: 'email.verificationTokens',
                token,
            },
            cache: this.options.cache,
        });
        if (service) {
            return this.findUserById(service.userId);
        }
        return null;
    }
    async createUser(createUser) {
        const { username, email, password, ...otherFields } = createUser;
        const user = new this.options.userEntity();
        if (email) {
            const userEmail = new this.options.userEmailEntity();
            userEmail.address = email.toLocaleLowerCase();
            userEmail.verified = false;
            await this.emailRepository.save(userEmail);
            user.emails = [userEmail];
        }
        if (password) {
            const userService = new this.options.userServiceEntity();
            userService.name = 'password';
            userService.options = { bcrypt: password };
            await this.serviceRepository.save(userService);
            user.allServices = [userService];
        }
        if (username) {
            user.username = username;
        }
        Object.assign(user, otherFields);
        await this.userRepository.save(user);
        return user.id;
    }
    async setUsername(userId, newUsername) {
        const user = await this.findUserById(userId);
        if (user) {
            user.username = newUsername;
            await this.userRepository.save(user);
            return;
        }
        throw new Error('User not found');
    }
    async findUserByServiceId(serviceName, serviceId) {
        const service = await this.serviceRepository.findOne({
            where: {
                name: serviceName,
                serviceId,
            },
            cache: this.options.cache,
        });
        if (service) {
            return this.findUserById(service.userId);
        }
        return null;
    }
    async getService(userId, serviceName) {
        const user = await this.findUserById(userId);
        if (user) {
            const service = user.allServices.find((s) => s.name === serviceName);
            if (service) {
                return service;
            }
        }
        return null;
    }
    async setService(userId, serviceName, data, token) {
        let service = await this.getService(userId, serviceName);
        if (!service) {
            const user = await this.findUserById(userId);
            if (user) {
                service = new this.options.userServiceEntity();
                service.name = serviceName;
                service.user = user;
            }
        }
        const { id = null, ...options } = data;
        if (service) {
            service.options = options;
            if (id) {
                service.serviceId = id;
            }
            if (token) {
                service.token = token;
            }
            await this.serviceRepository.save(service);
        }
    }
    async unsetService(userId, serviceName) {
        const user = await this.findUserById(userId);
        if (user) {
            const service = user.allServices.find((s) => s.name === serviceName);
            if (service) {
                await this.serviceRepository.remove(service);
            }
        }
    }
    async findPasswordHash(userId) {
        const service = await this.getService(userId, 'password');
        if (service) {
            return service.options.bcrypt;
        }
        return null;
    }
    async setPassword(userId, newPassword) {
        const user = await this.findUserById(userId);
        if (user) {
            await this.setService(userId, 'password', { bcrypt: newPassword });
            await this.userRepository.update({ id: user.id }, {});
            return;
        }
        throw new Error('User not found');
    }
    async addResetPasswordToken(userId, email, token, reason) {
        await this.setService(userId, 'password.reset', {
            address: email.toLocaleLowerCase(),
            when: new Date().toJSON(),
            reason,
        }, token);
    }
    async addEmail(userId, newEmail, verified) {
        const user = await this.findUserById(userId);
        if (user) {
            const userEmail = new this.options.userEmailEntity();
            userEmail.user = user;
            userEmail.address = newEmail.toLocaleLowerCase();
            userEmail.verified = verified;
            await this.emailRepository.save(userEmail);
            await this.userRepository.update({ id: user.id }, {});
            return;
        }
        throw new Error('User not found');
    }
    async removeEmail(userId, email) {
        const user = await this.findUserById(userId);
        if (user) {
            const userEmail = user.emails.find((s) => s.address === email.toLocaleLowerCase());
            if (!userEmail) {
                throw new Error('Email not found');
            }
            await this.emailRepository.remove(userEmail);
            await this.userRepository.update({ id: user.id }, {});
            return;
        }
        throw new Error('User not found');
    }
    async verifyEmail(userId, email) {
        const user = await this.findUserById(userId);
        if (user) {
            const userEmail = user.emails.find((s) => s.address === email.toLocaleLowerCase());
            if (!userEmail) {
                throw new Error('Email not found');
            }
            userEmail.verified = true;
            await this.emailRepository.save(userEmail);
            await this.unsetService(userId, 'email.verificationTokens');
            await this.userRepository.update({ id: user.id }, {});
            return;
        }
        throw new Error('User not found');
    }
    async addEmailVerificationToken(userId, email, token) {
        await this.setService(userId, 'email.verificationTokens', {
            address: email.toLocaleLowerCase(),
            when: new Date(),
        }, token);
    }
    async removeAllResetPasswordTokens(userId) {
        await this.unsetService(userId, 'password.reset');
    }
    async setUserDeactivated(userId, deactivated) {
        const user = await this.findUserById(userId);
        if (user) {
            user.deactivated = deactivated;
            await this.userRepository.save(user);
        }
    }
    async findSessionById(sessionId) {
        try {
            const session = await this.sessionRepository.findOne(sessionId, {
                cache: this.options.cache,
            });
            if (session) {
                return session;
            }
        }
        catch (err) {
            // noop
        }
        return null;
    }
    async findSessionByToken(token) {
        const session = await this.sessionRepository.findOne({ token }, {
            cache: this.options.cache,
        });
        if (!session) {
            return null;
        }
        return session;
    }
    async findUserByLoginToken(token) {
        const service = await this.serviceRepository.findOne({
            where: {
                name: 'magicLink.loginTokens',
                token,
            },
            cache: this.options.cache,
        });
        if (service) {
            return this.findUserById(service.userId);
        }
        return null;
    }
    async addLoginToken(userId, email, token) {
        await this.setService(userId, 'magicLink.loginTokens', {
            address: email.toLocaleLowerCase(),
            when: new Date().toJSON(),
        }, token);
    }
    async removeAllLoginTokens(userId) {
        await this.unsetService(userId, 'magicLink.loginTokens');
    }
    async createSession(userId, token, connection = {}, extra) {
        const user = await this.findUserById(userId);
        const session = new this.options.userSessionEntity();
        session.user = user;
        session.token = token;
        session.userAgent = connection.userAgent;
        session.ip = connection.ip;
        if (extra) {
            session.extra = extra;
        }
        session.valid = true;
        await this.sessionRepository.save(session);
        return session.id;
    }
    async updateSession(sessionId, connection) {
        const session = await this.findSessionById(sessionId);
        if (session) {
            session.userAgent = connection.userAgent;
            session.ip = connection.ip;
            await this.sessionRepository.save(session);
        }
    }
    async invalidateSession(sessionId) {
        const session = await this.findSessionById(sessionId);
        if (session) {
            session.valid = false;
            await this.sessionRepository.save(session);
        }
    }
    async invalidateAllSessions(userId, excludedSessionIds) {
        const selector = { userId };
        if (excludedSessionIds && excludedSessionIds.length > 0) {
            selector.id = (0, typeorm_1.Not)((0, typeorm_1.In)(excludedSessionIds));
        }
        await this.sessionRepository.update(selector, {
            valid: false,
        });
    }
}
exports.AccountsTypeorm = AccountsTypeorm;
//# sourceMappingURL=typeorm.js.map