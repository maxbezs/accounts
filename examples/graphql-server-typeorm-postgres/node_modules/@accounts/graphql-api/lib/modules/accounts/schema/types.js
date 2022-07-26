"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = (0, tslib_1.__importDefault)(require("graphql-tag"));
exports.default = (0, graphql_tag_1.default) `
  directive @auth on FIELD_DEFINITION | OBJECT

  type ImpersonateReturn {
    authorized: Boolean
    tokens: Tokens
    user: User
  }

  input UserInput {
    id: ID
    email: String
    username: String
  }

  input AuthenticateParamsInput {
    # Twitter, Instagram
    access_token: String
    # Twitter
    access_token_secret: String
    # OAuth
    provider: String
    # Password
    password: String
    # Password
    user: UserInput
    # Two factor
    code: String
    # Token
    token: String
  }

  input ImpersonationUserIdentityInput {
    userId: String
    username: String
    email: String
  }
`;
//# sourceMappingURL=types.js.map