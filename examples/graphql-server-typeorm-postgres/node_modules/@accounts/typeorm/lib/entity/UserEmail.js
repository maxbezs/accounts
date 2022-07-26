"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let UserEmail = class UserEmail {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], UserEmail.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.emails, { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", User_1.User)
], UserEmail.prototype, "user", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Unique)(['address']),
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserEmail.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: false }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UserEmail.prototype, "verified", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEmail.prototype, "userId", void 0);
UserEmail = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], UserEmail);
exports.UserEmail = UserEmail;
//# sourceMappingURL=UserEmail.js.map