"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.bcryptPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const bcryptPassword = async (password) => {
    const salt = await (0, bcryptjs_1.genSalt)(10);
    const hashedPassword = await (0, bcryptjs_1.hash)(password, salt);
    return hashedPassword;
};
exports.bcryptPassword = bcryptPassword;
const verifyPassword = async (password, hash) => (0, bcryptjs_1.compare)(password, hash);
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=encryption.js.map