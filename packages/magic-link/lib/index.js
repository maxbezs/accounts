"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsMagicLink = exports.RequestMagicLinkEmailErrors = exports.MagicLinkAuthenticatorErrors = exports.AuthenticateErrors = exports.errors = void 0;
const tslib_1 = require("tslib");
const accounts_magic_link_1 = (0, tslib_1.__importDefault)(require("./accounts-magic-link"));
exports.AccountsMagicLink = accounts_magic_link_1.default;
(0, tslib_1.__exportStar)(require("./types"), exports);
var errors_1 = require("./errors");
Object.defineProperty(exports, "errors", { enumerable: true, get: function () { return errors_1.errors; } });
Object.defineProperty(exports, "AuthenticateErrors", { enumerable: true, get: function () { return errors_1.AuthenticateErrors; } });
Object.defineProperty(exports, "MagicLinkAuthenticatorErrors", { enumerable: true, get: function () { return errors_1.MagicLinkAuthenticatorErrors; } });
Object.defineProperty(exports, "RequestMagicLinkEmailErrors", { enumerable: true, get: function () { return errors_1.RequestMagicLinkEmailErrors; } });
exports.default = accounts_magic_link_1.default;
//# sourceMappingURL=index.js.map