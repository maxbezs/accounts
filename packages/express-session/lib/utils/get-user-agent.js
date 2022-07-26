"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAgent = void 0;
const getUserAgent = (req) => {
    let userAgent = req.headers['user-agent'] || '';
    if (req.headers['x-ucbrowser-ua']) {
        // special case of UC Browser
        userAgent = req.headers['x-ucbrowser-ua'];
    }
    return userAgent;
};
exports.getUserAgent = getUserAgent;
//# sourceMappingURL=get-user-agent.js.map