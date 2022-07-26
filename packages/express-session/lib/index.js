"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsSession = void 0;
const tslib_1 = require("tslib");
const requestIp = (0, tslib_1.__importStar)(require("request-ip"));
const lodash_1 = require("lodash");
require("express-session");
const get_user_agent_1 = require("./utils/get-user-agent");
class AccountsSession {
    constructor(accountsServer, options) {
        this.accountsServer = accountsServer;
        this.options = (0, lodash_1.merge)({
            name: 'accounts-js-tokens',
            user: {
                name: 'user',
                resolve: null,
            },
        }, options);
    }
    middleware() {
        return async (req, res, next) => {
            try {
                const tokenResult = await this.renew(req);
                const tokens = this.get(req);
                if (tokens) {
                    const user = this.options.user.resolve
                        ? await this.options.user.resolve(tokens, req, tokenResult === null || tokenResult === void 0 ? void 0 : tokenResult.user)
                        : tokenResult === null || tokenResult === void 0 ? void 0 : tokenResult.user;
                    // eslint-disable-next-line
                    // @ts-ignore
                    req[this.options.user.name] = user;
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    async destroy(req) {
        const tokens = this.get(req);
        if (tokens && tokens.accessToken) {
            await this.accountsServer.logout(tokens.accessToken);
            await this.clear(req);
        }
        return new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    get(req) {
        if (!req) {
            return;
        }
        if (req.session && req.session[this.options.name]) {
            return req.session[this.options.name];
        }
    }
    async renew(req) {
        const tokens = this.get(req);
        if (this.accountsServer && tokens && tokens.accessToken && tokens.refreshToken) {
            const result = await this.accountsServer.refreshTokens(tokens.accessToken, tokens.refreshToken, { ip: requestIp.getClientIp(req), userAgent: (0, get_user_agent_1.getUserAgent)(req) });
            this.set(req, result.tokens);
            return result;
        }
    }
    set(req, tokens) {
        if (!tokens) {
            this.clear(req);
            return;
        }
        if (req.session) {
            req.session[this.options.name] = tokens;
        }
    }
    clear(req) {
        if (this.get(req)) {
            req.session[this.options.name] = null;
        }
    }
}
exports.AccountsSession = AccountsSession;
exports.default = AccountsSession;
//# sourceMappingURL=index.js.map