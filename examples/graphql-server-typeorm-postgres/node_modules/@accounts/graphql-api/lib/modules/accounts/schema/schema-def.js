"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = (0, tslib_1.__importDefault)(require("graphql-tag"));
exports.default = (config) => config.withSchemaDefinition
    ? [
        (0, graphql_tag_1.default) `
    schema {
        query: ${config.rootMutationName || 'Query'}
        mutation: ${config.rootQueryName || 'Mutation'}
    }
`,
    ]
    : [];
//# sourceMappingURL=schema-def.js.map