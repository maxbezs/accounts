"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoServicePassword = void 0;
const utils_1 = require("./utils");
const defaultOptions = {
    userCollectionName: 'users',
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    convertUserIdToMongoObjectId: true,
    caseSensitiveUserName: true,
    dateProvider: (date) => (date ? date.getTime() : Date.now()),
};
class MongoServicePassword {
    constructor(options) {
        this.options = {
            ...defaultOptions,
            ...options,
            timestamps: { ...defaultOptions.timestamps, ...options.timestamps },
        };
        this.database = this.options.database;
        this.userCollection = this.database.collection(this.options.userCollectionName);
    }
    /**
     * Setup the mongo indexes needed for the password service.
     * @param options Options passed to the mongo native `createIndex` method.
     */
    async setupIndexes(options = {}) {
        // Username index to allow fast queries made with username
        // Username is unique
        await this.userCollection.createIndex('username', {
            ...options,
            unique: true,
            sparse: true,
        });
        // Emails index to allow fast queries made with emails, a user can have multiple emails
        // Email address is unique
        await this.userCollection.createIndex('emails.address', {
            ...options,
            unique: true,
            sparse: true,
        });
        // Token index used to verify the email address of a user
        await this.userCollection.createIndex('services.email.verificationTokens.token', {
            ...options,
            sparse: true,
        });
        // Token index used to verify a password reset request
        await this.userCollection.createIndex('services.password.reset.token', {
            ...options,
            sparse: true,
        });
    }
    /**
     * Create a new user by providing an email and/or a username and password.
     * Emails are saved lowercased.
     */
    async createUser({ password, username, email, ...cleanUser }) {
        var _a;
        const user = {
            ...cleanUser,
            services: {
                password: {
                    bcrypt: password,
                },
            },
            [this.options.timestamps.createdAt]: this.options.dateProvider(),
            [this.options.timestamps.updatedAt]: this.options.dateProvider(),
        };
        if (username) {
            user.username = username;
        }
        if (email) {
            user.emails = [{ address: email.toLowerCase(), verified: false }];
        }
        if (this.options.idProvider) {
            user._id = this.options.idProvider();
        }
        const ret = await this.userCollection.insertOne(user);
        // keep ret.ops for compatibility with MongoDB 3.X, version 4.X uses insertedId
        return ((_a = ret.insertedId) !== null && _a !== void 0 ? _a : ret.ops[0]._id).toString();
    }
    /**
     * Get a user by his id.
     * @param userId Id used to query the user.
     */
    async findUserById(userId) {
        const id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        const user = await this.userCollection.findOne({ _id: id });
        if (user) {
            user.id = user._id.toString();
        }
        return user;
    }
    /**
     * Get a user by one of his emails.
     * Email will be lowercased before running the query.
     * @param email Email used to query the user.
     */
    async findUserByEmail(email) {
        const user = await this.userCollection.findOne({
            'emails.address': email.toLowerCase(),
        });
        if (user) {
            user.id = user._id.toString();
        }
        return user;
    }
    /**
     * Get a user by his username.
     * Set the `caseSensitiveUserName` option to false if you want the username to be case sensitive.
     * @param email Email used to query the user.
     */
    async findUserByUsername(username) {
        const filter = this.options.caseSensitiveUserName
            ? { username }
            : {
                $where: `obj.username && (obj.username.toLowerCase() === "${username.toLowerCase()}")`,
            };
        const user = await this.userCollection.findOne(filter);
        if (user) {
            user.id = user._id.toString();
        }
        return user;
    }
    /**
     * Return the user password hash.
     * If the user has no password set, will return null.
     * @param userId Id used to query the user.
     */
    async findPasswordHash(userId) {
        var _a, _b, _c;
        const user = await this.findUserById(userId);
        return (_c = (_b = (_a = user === null || user === void 0 ? void 0 : user.services) === null || _a === void 0 ? void 0 : _a.password) === null || _b === void 0 ? void 0 : _b.bcrypt) !== null && _c !== void 0 ? _c : null;
    }
    /**
     * Get a user by one of the email verification token.
     * @param token Verification token used to query the user.
     */
    async findUserByEmailVerificationToken(token) {
        const user = await this.userCollection.findOne({
            'services.email.verificationTokens.token': token,
        });
        if (user) {
            user.id = user._id.toString();
        }
        return user;
    }
    /**
     * Get a user by one of the reset password token.
     * @param token Reset password token used to query the user.
     */
    async findUserByResetPasswordToken(token) {
        const user = await this.userCollection.findOne({
            'services.password.reset.token': token,
        });
        if (user) {
            user.id = user._id.toString();
        }
        return user;
    }
    /**
     * Add an email address for a user.
     * @param userId Id used to update the user.
     * @param newEmail A new email address for the user.
     * @param verified Whether the new email address should be marked as verified.
     */
    async addEmail(userId, newEmail, verified) {
        const id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        const ret = await this.userCollection.updateOne({ _id: id }, {
            $addToSet: {
                emails: {
                    address: newEmail.toLowerCase(),
                    verified,
                },
            },
            $set: {
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
        });
        if ((ret.modifiedCount && ret.modifiedCount === 0) ||
            (ret.result && ret.result.nModified === 0)) {
            throw new Error('User not found');
        }
    }
    /**
     * Remove an email address for a user.
     * @param userId Id used to update the user.
     * @param email The email address to remove.
     */
    async removeEmail(userId, email) {
        const id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        const ret = await this.userCollection.updateOne({ _id: id }, {
            $pull: { emails: { address: email.toLowerCase() } },
            $set: {
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
        });
        if ((ret.modifiedCount && ret.modifiedCount === 0) ||
            (ret.result && ret.result.nModified === 0)) {
            throw new Error('User not found');
        }
    }
    /**
     * Marks the user's email address as verified.
     * @param userId Id used to update the user.
     * @param email The email address to mark as verified.
     */
    async verifyEmail(userId, email) {
        const id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        const ret = await this.userCollection.updateOne({ _id: id, 'emails.address': email }, {
            $set: {
                'emails.$.verified': true,
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
            $pull: { 'services.email.verificationTokens': { address: email } },
        });
        if ((ret.modifiedCount && ret.modifiedCount === 0) ||
            (ret.result && ret.result.nModified === 0)) {
            throw new Error('User not found');
        }
    }
    /**
     * Change the username of the user.
     * If the username already exists, the function will fail.
     * @param userId Id used to update the user.
     * @param newUsername A new username for the user.
     */
    async setUsername(userId, newUsername) {
        const id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        const ret = await this.userCollection.updateOne({ _id: id }, {
            $set: {
                username: newUsername,
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
        });
        if ((ret.modifiedCount && ret.modifiedCount === 0) ||
            (ret.result && ret.result.nModified === 0)) {
            throw new Error('User not found');
        }
    }
    /**
     * Change the password for a user.
     * @param userId Id used to update the user.
     * @param newPassword A new password for the user.
     */
    async setPassword(userId, newPassword) {
        const id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        const ret = await this.userCollection.updateOne({ _id: id }, {
            $set: {
                'services.password.bcrypt': newPassword,
                [this.options.timestamps.updatedAt]: this.options.dateProvider(),
            },
            $unset: {
                'services.password.reset': '',
            },
        });
        if ((ret.modifiedCount && ret.modifiedCount === 0) ||
            (ret.result && ret.result.nModified === 0)) {
            throw new Error('User not found');
        }
    }
    /**
     * Add an email verification token to a user.
     * @param userId Id used to update the user.
     * @param email Which address of the user's to link the token to.
     * @param token Random token used to verify the user email.
     */
    async addEmailVerificationToken(userId, email, token) {
        const _id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        await this.userCollection.updateOne({ _id }, {
            $push: {
                'services.email.verificationTokens': {
                    token,
                    address: email.toLowerCase(),
                    when: this.options.dateProvider(),
                },
            },
        });
    }
    /**
     * Add a reset password token to a user.
     * @param userId Id used to update the user.
     * @param email Which address of the user's to link the token to.
     * @param token Random token used to verify the user email.
     * @param reason Reason to use for the token.
     */
    async addResetPasswordToken(userId, email, token, reason) {
        const _id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        await this.userCollection.updateOne({ _id }, {
            $push: {
                'services.password.reset': {
                    token,
                    address: email.toLowerCase(),
                    when: this.options.dateProvider(),
                    reason,
                },
            },
        });
    }
    /**
     * Remove all the reset password tokens for a user.
     * @param userId Id used to update the user.
     */
    async removeAllResetPasswordTokens(userId) {
        const id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        await this.userCollection.updateOne({ _id: id }, {
            $unset: {
                'services.password.reset': '',
            },
        });
    }
}
exports.MongoServicePassword = MongoServicePassword;
//# sourceMappingURL=mongo-password.js.map