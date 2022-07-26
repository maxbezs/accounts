"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountsError extends Error {
    constructor(packageName, functionName, reason) {
        // Build Error message from parameters
        const message = reason
            ? `[ Accounts - ${packageName} ] ${functionName} : ${reason}`
            : packageName;
        // Build the underlying Error
        super(message);
        // Assign parameters for future use
        this.packageName = packageName;
        this.functionName = functionName;
        this.reason = reason;
        // Set the prototype to AccountsError so "instanceof AccountsError" returns true
        Object.setPrototypeOf(this, AccountsError.prototype);
        // Recapture the stack trace to avoid this function to be in it
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
        else {
            this.stack = new Error(message).stack;
        }
    }
}
exports.default = AccountsError;
//# sourceMappingURL=accounts-error.js.map