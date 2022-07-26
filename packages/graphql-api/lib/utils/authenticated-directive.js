"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedDirective = void 0;
const authenticated_resolver_1 = require("./authenticated-resolver");
const utils_1 = require("@graphql-tools/utils");
class AuthenticatedDirective extends utils_1.SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        field.resolve = (0, authenticated_resolver_1.authenticated)(field.resolve);
    }
    visitObject(object) {
        const fields = object.getFields();
        Object.keys(fields).forEach((fieldName) => {
            const field = fields[fieldName];
            if ('resolve' in field) {
                field.resolve = (0, authenticated_resolver_1.authenticated)(field.resolve);
            }
        });
    }
}
exports.AuthenticatedDirective = AuthenticatedDirective;
//# sourceMappingURL=authenticated-directive.js.map