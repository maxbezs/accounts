import { GraphQLError } from 'graphql/error/GraphQLError';
export declare class GraphQLErrorList extends Error {
    errors: readonly GraphQLError[];
    constructor(errors: readonly GraphQLError[], message?: string);
    toString(): string;
}
