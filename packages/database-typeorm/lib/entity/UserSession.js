"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSession = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let UserSession = class UserSession {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], UserSession.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.sessions, { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", User_1.User)
], UserSession.prototype, "user", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserSession.prototype, "token", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UserSession.prototype, "valid", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], UserSession.prototype, "userAgent", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], UserSession.prototype, "ip", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], UserSession.prototype, "extra", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserSession.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserSession.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserSession.prototype, "userId", void 0);
UserSession = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], UserSession);
exports.UserSession = UserSession;
//# sourceMappingURL=UserSession.js.map