"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFetch = void 0;
var tslib_1 = require("tslib");
var headers = {
    'Content-Type': 'application/json',
};
var authFetch = function (accounts, path, request) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
    var tokens, headersCopy, fetchOptions;
    return (0, tslib_1.__generator)(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, accounts.refreshSession()];
            case 1:
                tokens = _a.sent();
                headersCopy = (0, tslib_1.__assign)({}, headers);
                if (tokens) {
                    headersCopy.Authorization = 'Bearer ' + tokens.accessToken;
                }
                if (request['headers']) {
                    headersCopy = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, headersCopy), request['headers']);
                }
                fetchOptions = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, request), { headers: headersCopy });
                return [2 /*return*/, fetch(path, fetchOptions)];
        }
    });
}); };
exports.authFetch = authFetch;
//# sourceMappingURL=auth-fetch.js.map