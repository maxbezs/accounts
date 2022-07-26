"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsPassword = exports.VerifyEmailErrors = exports.SendResetPasswordEmailErrors = exports.SendVerificationEmailErrors = exports.ResetPasswordErrors = exports.CreateUserErrors = exports.ChangePasswordErrors = exports.AddEmailErrors = void 0;
const tslib_1 = require("tslib");
const accounts_password_1 = tslib_1.__importDefault(require("./accounts-password"));
exports.AccountsPassword = accounts_password_1.default;
tslib_1.__exportStar(require("./types"), exports);
var errors_1 = require("./errors");
Object.defineProperty(exports, "AddEmailErrors", { enumerable: true, get: function () { return errors_1.AddEmailErrors; } });
Object.defineProperty(exports, "ChangePasswordErrors", { enumerable: true, get: function () { return errors_1.ChangePasswordErrors; } });
Object.defineProperty(exports, "CreateUserErrors", { enumerable: true, get: function () { return errors_1.CreateUserErrors; } });
Object.defineProperty(exports, "ResetPasswordErrors", { enumerable: true, get: function () { return errors_1.ResetPasswordErrors; } });
Object.defineProperty(exports, "SendVerificationEmailErrors", { enumerable: true, get: function () { return errors_1.SendVerificationEmailErrors; } });
Object.defineProperty(exports, "SendResetPasswordEmailErrors", { enumerable: true, get: function () { return errors_1.SendResetPasswordEmailErrors; } });
Object.defineProperty(exports, "VerifyEmailErrors", { enumerable: true, get: function () { return errors_1.VerifyEmailErrors; } });
exports.default = accounts_password_1.default;
//# sourceMappingURL=index.js.map