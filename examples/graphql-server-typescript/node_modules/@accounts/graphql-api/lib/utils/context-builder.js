"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
const core_1 = require("@graphql-modules/core");
const request_ip_1 = require("request-ip");
const context = (moduleName) => async ({ req, connection }, _, { injector }) => {
    // If connection is set it means it's a websocket connection coming from apollo
    if (connection) {
        return connection.context;
    }
    if (!req) {
        return {
            ip: '',
            userAgent: '',
            infos: {
                ip: '',
                userAgent: '',
            },
        };
    }
    const config = injector.get((0, core_1.ModuleConfig)(moduleName));
    const headerName = config.headerName || 'Authorization';
    let authToken = (req.headers[headerName] || req.headers[headerName.toLowerCase()]);
    authToken = authToken && authToken.replace('Bearer ', '');
    let user;
    if (authToken && !config.excludeAddUserInContext) {
        try {
            user = await config.accountsServer.resumeSession(authToken);
        }
        catch (error) {
            // Empty catch
        }
    }
    const ip = (0, request_ip_1.getClientIp)(req);
    let userAgent = req.headers['user-agent'] || '';
    if (req.headers['x-ucbrowser-ua']) {
        // special case of UC Browser
        userAgent = req.headers['x-ucbrowser-ua'];
    }
    return {
        authToken,
        user,
        userId: user && user.id,
        userAgent,
        ip,
        infos: {
            userAgent,
            ip,
        },
    };
};
exports.context = context;
//# sourceMappingURL=context-builder.js.map