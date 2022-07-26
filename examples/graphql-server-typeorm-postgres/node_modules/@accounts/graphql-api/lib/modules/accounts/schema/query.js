"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = (0, tslib_1.__importDefault)(require("graphql-tag"));
exports.default = (config) => (0, graphql_tag_1.default) `
    ${config.extendTypeDefs ? 'extend' : ''} type ${config.rootQueryName || 'Query'}  {
        getUser: User
    }
`;
//# sourceMappingURL=query.js.map