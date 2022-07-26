"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = (0, tslib_1.__importDefault)(require("graphql-tag"));
exports.default = (0, graphql_tag_1.default) `
  type Tokens {
    refreshToken: String
    accessToken: String
  }

  type LoginResult {
    sessionId: String
    tokens: Tokens
    user: User
  }

  type CreateUserResult {
    # Will be returned only if ambiguousErrorMessages is set to false.
    userId: ID
    # Will be returned only if enableAutologin is set to true.
    loginResult: LoginResult
  }

  type TwoFactorSecretKey {
    ascii: String
    base32: String
    hex: String
    qr_code_ascii: String
    qr_code_hex: String
    qr_code_base32: String
    google_auth_qr: String
    otpauth_url: String
  }

  input TwoFactorSecretKeyInput {
    ascii: String
    base32: String
    hex: String
    qr_code_ascii: String
    qr_code_hex: String
    qr_code_base32: String
    google_auth_qr: String
    otpauth_url: String
  }

  input CreateUserInput {
    username: String
    email: String
    password: String
  }
`;
//# sourceMappingURL=types.js.map