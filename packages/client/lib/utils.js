"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenExpired = void 0;
var tslib_1 = require("tslib");
var jwt_decode_1 = (0, tslib_1.__importDefault)(require("jwt-decode"));
var isTokenExpired = function (token) {
    var currentTime = Date.now() / 1000;
    var decodedToken = (0, jwt_decode_1.default)(token);
    return decodedToken.exp < currentTime;
};
exports.isTokenExpired = isTokenExpired;
//# sourceMappingURL=utils.js.map