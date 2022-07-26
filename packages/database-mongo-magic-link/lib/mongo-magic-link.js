"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoServiceMagicLink = void 0;
const utils_1 = require("./utils");
const defaultOptions = {
    userCollectionName: 'users',
    convertUserIdToMongoObjectId: true,
    dateProvider: (date) => (date ? date.getTime() : Date.now()),
};
class MongoServiceMagicLink {
    constructor(options) {
        this.options = {
            ...defaultOptions,
            ...options,
        };
        this.database = this.options.database;
        this.userCollection = this.database.collection(this.options.userCollectionName);
    }
    /**
     * Setup the mongo indexes needed for the token service.
     * @param options Options passed to the mongo native `createIndex` method.
     */
    async setupIndexes(options = {}) {
        // Token index used to verify the email address of a user
        await this.userCollection.createIndex('services.magicLink.loginTokens.token', {
            ...options,
            sparse: true,
        });
    }
    /**
     * Find a user from a login token.
     * @param token Random token used to allow user to login.
     */
    async findUserByLoginToken(token) {
        const user = await this.userCollection.findOne({
            'services.magicLink.loginTokens.token': token,
        });
        if (user) {
            user.id = user._id.toString();
        }
        return user;
    }
    /**
     * Add a login token to a user.
     * @param userId Id used to update the user.
     * @param email Which address of the user's to link the token to.
     * @param token Random token used to allow user to login.
     */
    async addLoginToken(userId, email, token) {
        const _id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        await this.userCollection.updateOne({ _id }, {
            $push: {
                'services.magicLink.loginTokens': {
                    token,
                    address: email.toLowerCase(),
                    when: this.options.dateProvider(),
                },
            },
        });
    }
    /**
     * Remove all the login tokens for a user.
     * @param userId Id used to update the user.
     */
    async removeAllLoginTokens(userId) {
        const id = this.options.convertUserIdToMongoObjectId ? (0, utils_1.toMongoID)(userId) : userId;
        await this.userCollection.updateOne({ _id: id }, {
            $unset: {
                'services.magicLink.loginTokens': '',
            },
        });
    }
}
exports.MongoServiceMagicLink = MongoServiceMagicLink;
//# sourceMappingURL=mongo-magic-link.js.map