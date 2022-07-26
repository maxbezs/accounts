"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = exports.UserSession = exports.UserService = exports.UserEmail = exports.User = exports.AccountsTypeorm = void 0;
const typeorm_1 = require("./typeorm");
Object.defineProperty(exports, "AccountsTypeorm", { enumerable: true, get: function () { return typeorm_1.AccountsTypeorm; } });
const User_1 = require("./entity/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const UserEmail_1 = require("./entity/UserEmail");
Object.defineProperty(exports, "UserEmail", { enumerable: true, get: function () { return UserEmail_1.UserEmail; } });
const UserService_1 = require("./entity/UserService");
Object.defineProperty(exports, "UserService", { enumerable: true, get: function () { return UserService_1.UserService; } });
const UserSession_1 = require("./entity/UserSession");
Object.defineProperty(exports, "UserSession", { enumerable: true, get: function () { return UserSession_1.UserSession; } });
const entities = [User_1.User, UserEmail_1.UserEmail, UserService_1.UserService, UserSession_1.UserSession];
exports.entities = entities;
exports.default = typeorm_1.AccountsTypeorm;
//# sourceMappingURL=index.js.map