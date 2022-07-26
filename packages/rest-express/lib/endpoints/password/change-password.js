"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const send_error_1 = require("../../utils/send-error");
const changePassword = (accountsServer) => async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401);
            res.json({ message: 'Unauthorized' });
            return;
        }
        const { oldPassword, newPassword } = req.body;
        const accountsPassword = accountsServer.getServices().password;
        await accountsPassword.changePassword(userId, oldPassword, newPassword);
        res.json(null);
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=change-password.js.map