"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstUserEmail = void 0;
function getFirstUserEmail(user, address) {
    var _a, _b;
    // Pick the first email if we weren't passed an email
    if (!address) {
        if (user.emails && user.emails[0]) {
            address = user.emails[0].address;
        }
        else {
            throw new Error("User doesn't have an email address");
        }
    }
    const validAddresses = (_b = (_a = user.emails) === null || _a === void 0 ? void 0 : _a.map((email) => email.address)) !== null && _b !== void 0 ? _b : [];
    const addressIsValid = validAddresses.includes(address);
    if (!addressIsValid) {
        throw new Error('No such email address for user');
    }
    return address;
}
exports.getFirstUserEmail = getFirstUserEmail;
//# sourceMappingURL=get-first-user-email.js.map