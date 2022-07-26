"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceAuthenticate = void 0;
const send_error_1 = require("../utils/send-error");
const serviceAuthenticate = (accountsServer) => async (req, res) => {
    try {
        const serviceName = req.params.service;
        const loggedInUser = await accountsServer.loginWithService(serviceName, req.body, req.infos);
        res.json(loggedInUser);
    }
    catch (err) {
        (0, send_error_1.sendError)(res, err);
    }
};
exports.serviceAuthenticate = serviceAuthenticate;
//# sourceMappingURL=service-authenticate.js.map