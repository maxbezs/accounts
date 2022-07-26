"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsJsError = void 0;
var tslib_1 = require("tslib");
var AccountsJsError = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(AccountsJsError, _super);
    function AccountsJsError(message, code) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.code = code;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return AccountsJsError;
}(Error));
exports.AccountsJsError = AccountsJsError;
//# sourceMappingURL=accounts-error.js.map