"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("./modules");
exports.default = modules_1.AccountsModule.forRoot({
    accountsServer: {
        getServices: () => ({
            password: {},
            magicLink: {},
        }),
    },
}).typeDefs;
//# sourceMappingURL=schema.js.map