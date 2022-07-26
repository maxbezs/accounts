"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let UserService = class UserService {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], UserService.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.services, { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", User_1.User)
], UserService.prototype, "user", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserService.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserService.prototype, "token", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], UserService.prototype, "options", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserService.prototype, "serviceId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserService.prototype, "userId", void 0);
UserService = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map