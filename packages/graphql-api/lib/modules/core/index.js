"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreAccountsModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@graphql-modules/core");
const schema_1 = (0, tslib_1.__importDefault)(require("./schema"));
exports.CoreAccountsModule = new core_1.GraphQLModule({
    typeDefs: ({ config }) => (0, schema_1.default)(config),
    resolvers: {},
    imports: [],
});
//# sourceMappingURL=index.js.map