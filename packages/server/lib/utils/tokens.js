"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.generateRandomToken = void 0;
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const crypto_1 = require("crypto");
/**
 * Generate a random token string
 */
const generateRandomToken = (length = 43) => (0, crypto_1.randomBytes)(length).toString('hex');
exports.generateRandomToken = generateRandomToken;
const generateAccessToken = ({ secret, payload = {}, config, }) => jwt.sign(payload, secret, config);
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = ({ secret, payload = {}, config, }) => jwt.sign(payload, secret, config);
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=tokens.js.map