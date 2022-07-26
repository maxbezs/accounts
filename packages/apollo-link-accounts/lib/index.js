"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountsLink = void 0;
var tslib_1 = require("tslib");
var context_1 = require("@apollo/client/link/context");
var accountsLink = function (accountsClientFactory) {
    return (0, context_1.setContext)(function (req, _a) {
        var headersWithoutTokens = _a.headers;
        return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
            var accountsClient, headers, tokens;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, accountsClientFactory()];
                    case 1:
                        accountsClient = _b.sent();
                        headers = (0, tslib_1.__assign)({}, headersWithoutTokens);
                        if (!(req.operationName !== 'refreshTokens')) return [3 /*break*/, 3];
                        return [4 /*yield*/, accountsClient.refreshSession()];
                    case 2:
                        tokens = _b.sent();
                        if (tokens) {
                            headers.Authorization = 'Bearer ' + tokens.accessToken;
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/, {
                            headers: headers,
                        }];
                }
            });
        });
    });
};
exports.accountsLink = accountsLink;
//# sourceMappingURL=index.js.map