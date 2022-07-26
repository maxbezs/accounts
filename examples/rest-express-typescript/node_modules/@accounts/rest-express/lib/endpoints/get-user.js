"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const getUser = () => async (req, res) => {
    res.json(req.user || null);
};
exports.getUser = getUser;
//# sourceMappingURL=get-user.js.map