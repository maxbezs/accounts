"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = (0, tslib_1.__importDefault)(require("graphql-tag"));
exports.default = ({ userAsInterface }) => (0, graphql_tag_1.default) `
  ${userAsInterface ? 'interface' : 'type'} User {
    id: ID!
    emails: [EmailRecord!]
    username: String
  }

  type EmailRecord {
    address: String
    verified: Boolean
  }
  
  type Tokens {
    refreshToken: String
    accessToken: String
  }

  type LoginResult {
    sessionId: String
    tokens: Tokens
    user: User
  }
`;
//# sourceMappingURL=schema.js.map