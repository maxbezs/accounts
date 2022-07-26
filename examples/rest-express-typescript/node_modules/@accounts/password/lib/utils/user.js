"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserVerificationTokens = exports.getUserResetTokens = void 0;
const getUserResetTokens = (user) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = user.services) === null || _a === void 0 ? void 0 : _a.password) === null || _b === void 0 ? void 0 : _b.reset) !== null && _c !== void 0 ? _c : [];
};
exports.getUserResetTokens = getUserResetTokens;
const getUserVerificationTokens = (user) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = user.services) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.verificationTokens) !== null && _c !== void 0 ? _c : [];
};
exports.getUserVerificationTokens = getUserVerificationTokens;
//# sourceMappingURL=user.js.map