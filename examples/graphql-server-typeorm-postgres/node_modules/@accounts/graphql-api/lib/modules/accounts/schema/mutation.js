"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = (0, tslib_1.__importDefault)(require("graphql-tag"));
exports.default = (config) => (0, graphql_tag_1.default) `
  ${config.extendTypeDefs ? 'extend' : ''} type ${config.rootMutationName || 'Mutation'} {
    impersonate(accessToken: String!, impersonated: ImpersonationUserIdentityInput!): ImpersonateReturn
    refreshTokens(accessToken: String!, refreshToken: String!): LoginResult
    logout: Boolean

    # Example: Login with password
    # authenticate(serviceName: "password", params: {password: "<pw>", user: {email: "<email>"}})
    authenticate(serviceName: String!, params: AuthenticateParamsInput!): LoginResult
    verifyAuthentication(serviceName: String!, params: AuthenticateParamsInput!): Boolean
  }
`;
//# sourceMappingURL=mutation.js.map