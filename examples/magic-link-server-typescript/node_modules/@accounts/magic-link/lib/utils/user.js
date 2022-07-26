"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLoginTokens = void 0;
const getUserLoginTokens = (user) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = user.services) === null || _a === void 0 ? void 0 : _a.magicLink) === null || _b === void 0 ? void 0 : _b.loginTokens) !== null && _c !== void 0 ? _c : [];
};
exports.getUserLoginTokens = getUserLoginTokens;
//# sourceMappingURL=user.js.map