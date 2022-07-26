import { SchemaDirectiveVisitor } from '@graphql-tools/utils';
export declare class AuthenticatedDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: any): void;
    visitObject(object: any): void;
}
