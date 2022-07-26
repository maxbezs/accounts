"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsMagicLinkModule = void 0;
const tslib_1 = require("tslib");
const server_1 = require("@accounts/server");
const password_1 = require("@accounts/password");
const magic_link_1 = require("@accounts/magic-link");
const core_1 = require("@graphql-modules/core");
const mutation_1 = (0, tslib_1.__importDefault)(require("./schema/mutation"));
const mutation_2 = require("./resolvers/mutation");
const core_2 = require("../core");
const utils_1 = require("../../utils");
exports.AccountsMagicLinkModule = new core_1.GraphQLModule({
    name: 'accounts-magic-link',
    typeDefs: ({ config }) => [(0, mutation_1.default)(config)],
    resolvers: ({ config }) => ({
        [config.rootMutationName || 'Mutation']: mutation_2.Mutation,
    }),
    imports: ({ config }) => [
        core_2.CoreAccountsModule.forRoot({
            userAsInterface: config.userAsInterface,
        }),
    ],
    providers: ({ config }) => [
        {
            provide: server_1.AccountsServer,
            useValue: config.accountsServer,
        },
        {
            provide: password_1.AccountsPassword,
            useValue: config.accountsPassword,
        },
        {
            provide: magic_link_1.AccountsMagicLink,
            useValue: config.accountsMagicLink,
        },
    ],
    context: (0, utils_1.context)('accounts-magic-link'),
    configRequired: true,
});
//# sourceMappingURL=index.js.map