"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo = void 0;
const mongodb_1 = require("mongodb");
const mongo_sessions_1 = require("@accounts/mongo-sessions");
const mongo_password_1 = require("@accounts/mongo-password");
const mongo_magic_link_1 = require("@accounts/mongo-magic-link");
const toMongoID = (objectId) => {
    if (typeof objectId === 'string') {
        return new mongodb_1.ObjectID(objectId);
    }
    return objectId;
};
const defaultOptions = {
    collectionName: 'users',
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    convertUserIdToMongoObjectId: true,
    convertSessionIdToMongoObjectId: true,
    caseSensitiveUserName: true,
    dateProvider: (date) => (date ? date.getTime() : Date.now()),
};
class Mongo {
    constructor(db, options = {}) {
        this.options = {
            ...defaultOptions,
            ...options,
            timestamps: { ...defaultOptions.timestamps, ...options.timestamps },
        };
        if (!db) {
            throw new Error('A database connection is required');
        }
        this.db = db;
        this.collection = this.db.collection(this.options.collectionName);
        this.sessions = new mongo_sessions_1.MongoSessions({ ...this.options, database: this.db });
        this.servicePassword = new mongo_password_1.MongoServicePassword({
            ...this.options,
            userCollectionName: this.options.collectionName,
            database: this.db,
        });
        this.serviceMagicLink = new mongo_magic_link_1.MongoServiceMagicLink({
            ...this.options,
            userCollectionName: this.options.collectionName,
            database: this.db,
        });
    }
    /**
     * Setup the mongo indexes needed.
     * @param options Options passed to the mongo native `createIndex` method.
     */
    async setupIndexes(options = {}) {
        await this.sessions.setupIndexes(options);
        await this.servicePassword.setupIndexes(options);
        await this.serviceMagicLink.setupIndexes(options);
    }
    async findUserById(userId) {
        return this.servicePassword.findUserById(userId);
    }
    async createUser(user) {
        return this.servicePassword.createUser(user);
    }
    async findUserByEmail(email) {
        return this.servicePassword.findUserByEmail(email);
    }
    async findUserByUsername(username) {
        return this.servicePassword.findUserByUsername(username);
    }
    async findPasswordHash(userId) {
        return this.servicePassword.findPasswordHash(userId);
    }
    async findUserByEmailVerificationToken(token) {
        return this.servicePassword.findUserByEmailVerificationToken(token);
    }
    async findUserByResetPasswordToken(token) {
        return this.servicePassword.findUserByResetPasswordToken(token);
    }
    async addEmail(userId, newEmail, verified) {
        return this.servicePassword.addEmail(userId, newEmail, verified);
    }
    async removeEmail(userId, email) {
        return this.servicePassword.removeEmail(userId, email);
    }
    async verifyEmail(userId, email) {
        return this.servicePassword.verifyEmail(userId, email);
    }
    async setUsername(userId, newUsername) {
        return this.servicePassword.setUsername(userId, newUsername);
    }
    async setPassword(userId, newPassword) {
        return this.servicePassword.setPassword(userId, newPassword);
    }
    async removeAllResetPasswordTokens(userId) {
        return this.servicePassword.removeAllResetPasswordTokens(userId);
    }
    async addEmailVerificationToken(userId, email, token) {
        return this.servicePassword.addEmailVerificationToken(userId, email, token);
    }
    async addResetPasswordToken(userId, email, token, reason) {
        return this.servicePassword.addResetPasswordToken(userId, email, token, reason);
    }
    async addLoginToken(userId, email, token) {
        return this.serviceMagicLink.addLoginToken(userId, email, token);
    }
    async findUserByLoginToken(token) {
        return this.serviceMagicLink.findUserByLoginToken(token);
    }
    async removeAllLoginTokens(userId) {
        return this.serviceMagicLink.removeAllLoginTokens(userId);
    }
    async createSession(userId, token, connection = {}, extraData) {
        return this.sessions.createSession(userId, token, connection, extraData);
    }
    async findSessionById(sessionId) {
        return this.sessions.findSessionById(sessionId);
    }
    async findSessionByToken(token) {
        return this.sessions.findSessionByToken(token);
    }
    async updateSession(sessionId, connection, newToken) {
        return this.sessions.updateSession(sessionId, connection, newToken);
    }
    async invalidateSession(sessionId) {
        return this.sessions.invalidateSession(sessionId);
    }
    async invalidateAllSessions(userId, excludedSessionIds) {
        return this.sessions.invalidateAllSessions(userId, excludedSessionIds);
    }
    async findUserByServiceId(serviceName, serviceId) {
        const user = await this.collection.findOne({
            [`services.${serviceName}.id`]: serviceId,
        });
        if (user) {
            user.id = user._id.toString();
        }
        return user;
    }
    async setService(userId, serviceName, service) {
        const id = this.options.convertUserIdToMongoObjectId ? toMongoID(userId) : userId;
        await this.collection.updateOne({ _id: id }, {
            $set: {
                [`services.${serviceName}`]: service,
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
        });
    }
    async unsetService(userId, serviceName) {
        const id = this.options.convertUserIdToMongoObjectId ? toMongoID(userId) : userId;
        await this.collection.updateOne({ _id: id }, {
            $set: {
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
            $unset: {
                [`services.${serviceName}`]: '',
            },
        });
    }
    async setUserDeactivated(userId, deactivated) {
        const id = this.options.convertUserIdToMongoObjectId ? toMongoID(userId) : userId;
        await this.collection.updateOne({ _id: id }, {
            $set: {
                deactivated,
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
        });
    }
}
exports.Mongo = Mongo;
//# sourceMappingURL=mongo.js.map