"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoSessions = void 0;
const utils_1 = require("./utils");
const defaultOptions = {
    sessionCollectionName: 'sessions',
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    convertSessionIdToMongoObjectId: true,
    dateProvider: (date) => (date ? date.getTime() : Date.now()),
};
class MongoSessions {
    constructor(options) {
        this.options = {
            ...defaultOptions,
            ...options,
            timestamps: { ...defaultOptions.timestamps, ...options.timestamps },
        };
        if (typeof this.options.idSessionProvider === 'function' &&
            this.options.convertSessionIdToMongoObjectId) {
            console.warn(`You have set both "options.idSessionProvider" and "options.convertSessionIdToMongoObjectId = true" which will cause your "options.idSessionProvider" to be ignored. 
      In order to fix this warning change "options.convertSessionIdToMongoObjectId" to "false" or remove your "options.idSessionProvider" from the configuration.
      `);
        }
        this.database = this.options.database;
        this.sessionCollection = this.database.collection(this.options.sessionCollectionName);
    }
    /**
     * Setup the mongo indexes needed for the sessions.
     * @param options Options passed to the mongo native `createIndex` method.
     */
    async setupIndexes(options = {}) {
        // Token index used to query a session
        await this.sessionCollection.createIndex('token', {
            ...options,
            unique: true,
            sparse: true,
        });
    }
    /**
     * Create a new session attached to a user.
     * @param userId User id of the session.
     * @param token Random token used to identify the session.
     * @param connection Connection informations related to the session (such as user agent, ip etc..).
     * @param extraData Any extra data you would like to add. The data will be added to the root of the object.
     */
    async createSession(userId, token, connection = {}, extraData) {
        var _a;
        const session = {
            userId,
            token,
            userAgent: connection.userAgent,
            ip: connection.ip,
            extraData,
            valid: true,
            [this.options.timestamps.createdAt]: this.options.dateProvider(),
            [this.options.timestamps.updatedAt]: this.options.dateProvider(),
        };
        if (this.options.idSessionProvider && !this.options.convertSessionIdToMongoObjectId) {
            session._id = this.options.idSessionProvider();
        }
        const ret = await this.sessionCollection.insertOne(session);
        // keep ret.ops for compatibility with MongoDB 3.X, version 4.X uses insertedId
        return ((_a = ret.insertedId) !== null && _a !== void 0 ? _a : ret.ops[0]._id).toString();
    }
    /**
     * Get a session by his id.
     * @param sessionId Id used to query the session.
     */
    async findSessionById(sessionId) {
        const _id = this.options.convertSessionIdToMongoObjectId ? (0, utils_1.toMongoID)(sessionId) : sessionId;
        const session = await this.sessionCollection.findOne({ _id });
        if (session) {
            session.id = session._id.toString();
        }
        return session;
    }
    /**
     * Get a session by his token.
     * @param token Token used to query the session.
     */
    async findSessionByToken(token) {
        const session = await this.sessionCollection.findOne({ token });
        if (session) {
            session.id = session._id.toString();
        }
        return session;
    }
    /**
     * Update the session informations, token and connection informations.
     * @param sessionId Id used to update the session.
     * @param connection Connection informations related to the session (such as user agent, ip etc..).
     * @param newToken New token that will replace the existing token for the session.
     */
    async updateSession(sessionId, connection, newToken) {
        const updateClause = {
            $set: {
                userAgent: connection.userAgent,
                ip: connection.ip,
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
        };
        if (newToken) {
            updateClause.$set.token = newToken;
        }
        const _id = this.options.convertSessionIdToMongoObjectId ? (0, utils_1.toMongoID)(sessionId) : sessionId;
        await this.sessionCollection.updateOne({ _id }, updateClause);
    }
    /**
     * Invalidate a session.
     * @param sessionId Id of the session to invalidate.
     */
    async invalidateSession(sessionId) {
        const _id = this.options.convertSessionIdToMongoObjectId ? (0, utils_1.toMongoID)(sessionId) : sessionId;
        await this.sessionCollection.updateOne({ _id }, {
            $set: {
                valid: false,
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
        });
    }
    /**
     * Invalidate all the session of a user.
     * @param userId User id of the sessions.
     * @param excludedSessionIds Can be used to whitelist some sessions. Eg: close all the sessions except these ones.
     */
    async invalidateAllSessions(userId, excludedSessionIds) {
        const selector = { userId };
        if (excludedSessionIds && excludedSessionIds.length > 0) {
            let excludedObjectIds = excludedSessionIds;
            if (this.options.convertSessionIdToMongoObjectId) {
                excludedObjectIds = excludedSessionIds.map((sessionId) => {
                    return (0, utils_1.toMongoID)(sessionId);
                });
            }
            selector._id = {
                $nin: excludedObjectIds,
            };
        }
        await this.sessionCollection.updateMany(selector, {
            $set: {
                valid: false,
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
        });
    }
}
exports.MongoSessions = MongoSessions;
//# sourceMappingURL=mongo-sessions.js.map