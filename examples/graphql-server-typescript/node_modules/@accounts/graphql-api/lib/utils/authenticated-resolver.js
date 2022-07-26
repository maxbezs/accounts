"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = void 0;
const authenticated = (func) => async (root, args, context, info) => {
    if (context && context.skipJSAccountsVerification === true) {
        return func(root, args, context, info);
    }
    if (!context.userId && !context.user) {
        throw new Error('Unauthorized');
    }
    return func(root, args, context, info);
};
exports.authenticated = authenticated;
//# sourceMappingURL=authenticated-resolver.js.map