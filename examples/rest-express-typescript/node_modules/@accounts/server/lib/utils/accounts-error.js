"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsJsError = void 0;
class AccountsJsError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AccountsJsError = AccountsJsError;
//# sourceMappingURL=accounts-error.js.map