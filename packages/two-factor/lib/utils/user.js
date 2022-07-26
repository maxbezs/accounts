"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTwoFactorService = void 0;
/**
 * Return the user two factor service object
 */
const getUserTwoFactorService = (user) => {
    var _a, _b;
    return (_b = (_a = user.services) === null || _a === void 0 ? void 0 : _a['two-factor']) !== null && _b !== void 0 ? _b : null;
};
exports.getUserTwoFactorService = getUserTwoFactorService;
//# sourceMappingURL=user.js.map