"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSessions = void 0;
const tslib_1 = require("tslib");
const shortid = (0, tslib_1.__importStar)(require("shortid"));
const defaultOptions = {
    userCollectionName: 'users',
    sessionCollectionName: 'sessions',
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    idProvider: () => shortid.generate(),
    dateProvider: (date) => (date ? date.getTime() : Date.now()),
};
class RedisSessions {
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
    }
    async createSession(userId, token, connection = {}, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData) {
        const sessionId = this.options.idProvider();
        const pipeline = this.db.pipeline();
        pipeline.hmset(`${this.options.sessionCollectionName}:${sessionId}`, {
            userId,
            token,
            userAgent: connection.userAgent,
            ip: connection.ip,
            valid: true,
            [this.options.timestamps.createdAt]: this.options.dateProvider(),
            [this.options.timestamps.updatedAt]: this.options.dateProvider(),
        });
        // Push the sessionId inside the userId
        pipeline.sadd(`${this.options.sessionCollectionName}:${this.options.userCollectionName}:${userId}`, sessionId);
        // Link the session token to the sessionId
        pipeline.set(`${this.options.sessionCollectionName}:token:${token}`, sessionId);
        await pipeline.exec();
        return sessionId;
    }
    async updateSession(sessionId, connection) {
        var _a, _b;
        if (await this.db.exists(`${this.options.sessionCollectionName}:${sessionId}`)) {
            await this.db.hmset(`${this.options.sessionCollectionName}:${sessionId}`, {
                userAgent: (_a = connection.userAgent) !== null && _a !== void 0 ? _a : undefined,
                ip: (_b = connection.ip) !== null && _b !== void 0 ? _b : undefined,
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            });
        }
    }
    async invalidateSession(sessionId) {
        if (await this.db.exists(`${this.options.sessionCollectionName}:${sessionId}`)) {
            await this.db.hmset(`${this.options.sessionCollectionName}:${sessionId}`, {
                valid: 'false',
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            });
        }
    }
    async invalidateAllSessions(userId, excludedSessionIds) {
        if (await this.db.exists(`${this.options.sessionCollectionName}:${this.options.userCollectionName}:${userId}`)) {
            let sessionIds = await this.db.smembers(`${this.options.sessionCollectionName}:${this.options.userCollectionName}:${userId}`);
            if (excludedSessionIds && excludedSessionIds.length > 0) {
                sessionIds = sessionIds.filter((sessionId) => {
                    return !excludedSessionIds.includes(sessionId);
                });
            }
            await sessionIds.map((sessionId) => this.invalidateSession(sessionId));
        }
    }
    async findSessionByToken(token) {
        if (await this.db.exists(`${this.options.sessionCollectionName}:token:${token}`)) {
            const sessionId = await this.db.get(`${this.options.sessionCollectionName}:token:${token}`);
            if (sessionId) {
                return this.findSessionById(sessionId);
            }
        }
        return null;
    }
    async findSessionById(sessionId) {
        if (await this.db.exists(`${this.options.sessionCollectionName}:${sessionId}`)) {
            const session = await this.db.hgetall(`${this.options.sessionCollectionName}:${sessionId}`);
            return this.formatSession(sessionId, session);
        }
        return null;
    }
    /**
     * We need to format the session to have an object the server can understand.
     */
    formatSession(sessionId, session) {
        // Redis doesn't store boolean values, so we need turn this string into a boolean
        session.valid = session.valid === 'true';
        return { id: sessionId, ...session };
    }
}
exports.RedisSessions = RedisSessions;
//# sourceMappingURL=redis.js.map