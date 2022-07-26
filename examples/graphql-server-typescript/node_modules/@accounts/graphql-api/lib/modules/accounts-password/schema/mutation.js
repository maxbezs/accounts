"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = (0, tslib_1.__importDefault)(require("graphql-tag"));
exports.default = (config) => (0, graphql_tag_1.default) `
  ${config.extendTypeDefs ? 'extend' : ''} type ${config.rootMutationName || 'Mutation'} {
    # Creates a user with a password, returns the id corresponding db ids, such as number IDs, ObjectIDs or UUIDs
    createUser(user: CreateUserInput!): CreateUserResult
    verifyEmail(token: String!): Boolean
    resetPassword(token: String!, newPassword: String!): LoginResult
    sendVerificationEmail(email: String!): Boolean
    sendResetPasswordEmail(email: String!): Boolean
    addEmail(newEmail: String!): Boolean
    changePassword(oldPassword: String!, newPassword: String!): Boolean
    twoFactorSet(secret: TwoFactorSecretKeyInput!, code: String!): Boolean
    twoFactorUnset(code: String!): Boolean
  }
`;
//# sourceMappingURL=mutation.js.map