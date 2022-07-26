"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@graphql-modules/core");
const merge_1 = require("@graphql-tools/merge");
const server_1 = require("@accounts/server");
const types_1 = (0, tslib_1.__importDefault)(require("./schema/types"));
const query_1 = (0, tslib_1.__importDefault)(require("./schema/query"));
const mutation_1 = (0, tslib_1.__importDefault)(require("./schema/mutation"));
const schema_def_1 = (0, tslib_1.__importDefault)(require("./schema/schema-def"));
const query_2 = require("./resolvers/query");
const mutation_2 = require("./resolvers/mutation");
const user_1 = require("./resolvers/user");
const accounts_password_1 = require("../accounts-password");
const accounts_magic_link_1 = require("../accounts-magic-link");
const authenticated_directive_1 = require("../../utils/authenticated-directive");
const utils_1 = require("../../utils");
const core_2 = require("../core");
// You can see the below. It is really easy to create a reusable GraphQL-Module with different configurations
exports.AccountsModule = new core_1.GraphQLModule({
    name: 'accounts',
    typeDefs: ({ config }) => (0, merge_1.mergeTypeDefs)([
        types_1.default,
        (0, query_1.default)(config),
        (0, mutation_1.default)(config),
        ...(0, schema_def_1.default)(config),
    ], {
        useSchemaDefinition: config.withSchemaDefinition,
    }),
    resolvers: ({ config }) => ({
        [config.rootQueryName || 'Query']: query_2.Query,
        [config.rootMutationName || 'Mutation']: mutation_2.Mutation,
        User: user_1.User,
    }),
    // If necessary, import AccountsPasswordModule together with this module
    imports: ({ config }) => [
        core_2.CoreAccountsModule.forRoot({
            userAsInterface: config.userAsInterface,
        }),
        ...(config.accountsServer.getServices().password
            ? [
                accounts_password_1.AccountsPasswordModule.forRoot({
                    accountsPassword: config.accountsServer.getServices().password,
                    ...config,
                }),
            ]
            : []),
        ...(config.accountsServer.getServices().magicLink
            ? [
                accounts_magic_link_1.AccountsMagicLinkModule.forRoot({
                    accountsPassword: config.accountsServer.getServices().password,
                    accountsMagicLink: config.accountsServer.getServices().magicLink,
                    ...config,
                }),
            ]
            : []),
    ],
    providers: ({ config }) => [
        {
            provide: server_1.AccountsServer,
            useValue: config.accountsServer,
        },
    ],
    context: (0, utils_1.context)('accounts'),
    schemaDirectives: {
        auth: authenticated_directive_1.AuthenticatedDirective,
    },
    configRequired: true,
});
//# sourceMappingURL=index.js.map