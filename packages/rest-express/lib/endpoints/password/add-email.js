"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmail = void 0;
const send_error_1 = require("../../utils/send-error");
const addEmail = (accountsServer) => async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401);
            res.json({ message: 'Unauthorized' });
            return;
        }
        const { newEmail } = req.body;
        const accountsPassword = accountsServer.getServices().password;
        await accountsPassword.addEmail(userId, newEmail);
        res.json(null);
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.addEmail = addEmail;
//# sourceMappingURL=add-email.js.map