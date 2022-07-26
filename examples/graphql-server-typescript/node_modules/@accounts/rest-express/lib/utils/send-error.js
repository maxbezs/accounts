"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = void 0;
const sendError = (res, err) => res.status(400).json({
    message: err.message,
    code: err.code,
});
exports.sendError = sendError;
//# sourceMappingURL=send-error.js.map