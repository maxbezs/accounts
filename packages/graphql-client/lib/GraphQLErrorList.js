"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLErrorList = void 0;
var tslib_1 = require("tslib");
var GraphQLErrorList = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(GraphQLErrorList, _super);
    function GraphQLErrorList(errors, message) {
        var _this = _super.call(this) || this;
        _this.errors = errors;
        _this.stack = new Error().stack;
        var br = '\r\n';
        var summary = "".concat(errors.length, " error").concat(errors.length > 1 ? 's' : '').concat(message ? ' ' + message : ':');
        var errList = errors.map(function (err) { return "\t- ".concat(err.message); }).join(br);
        _this.message = "GraphQLErrorList - ".concat(summary).concat(br).concat(errList);
        return _this;
    }
    GraphQLErrorList.prototype.toString = function () {
        return this.errors.map(function (err) { return err.toString(); }).join('\r\n');
    };
    return GraphQLErrorList;
}(Error));
exports.GraphQLErrorList = GraphQLErrorList;
//# sourceMappingURL=GraphQLErrorList.js.map