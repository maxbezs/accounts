"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsPasswordModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@graphql-modules/core");
const password_1 = require("@accounts/password");
const server_1 = require("@accounts/server");
const types_1 = (0, tslib_1.__importDefault)(require("./schema/types"));
const query_1 = (0, tslib_1.__importDefault)(require("./schema/query"));
const mutation_1 = (0, tslib_1.__importDefault)(require("./schema/mutation"));
const query_2 = require("./resolvers/query");
const mutation_2 = require("./resolvers/mutation");
const utils_1 = require("../../utils");
const core_2 = require("../core");
exports.AccountsPasswordModule = new core_1.GraphQLModule({
    name: 'accounts-password',
    typeDefs: ({ config }) => [
        types_1.default,
        (0, query_1.default)(config),
        (0, mutation_1.default)(config),
    ],
    resolvers: ({ config }) => ({
        [config.rootQueryName || 'Query']: query_2.Query,
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
    ],
    context: (0, utils_1.context)('accounts-password'),
    configRequired: true,
});
//# sourceMappingURL=index.js.map