"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceVerifyAuthentication = void 0;
const send_error_1 = require("../utils/send-error");
const serviceVerifyAuthentication = (accountsServer) => async (req, res) => {
    try {
        const serviceName = req.params.service;
        const isAuthenticated = await accountsServer.authenticateWithService(serviceName, req.body, req.infos);
        res.json(isAuthenticated);
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.serviceVerifyAuthentication = serviceVerifyAuthentication;
//# sourceMappingURL=verify-authentication.js.map