"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoader = void 0;
const tslib_1 = require("tslib");
const express_middleware_1 = (0, tslib_1.__importDefault)(require("./express-middleware"));
var user_loader_1 = require("./user-loader");
Object.defineProperty(exports, "userLoader", { enumerable: true, get: function () { return user_loader_1.userLoader; } });
exports.default = express_middleware_1.default;
//# sourceMappingURL=index.js.map