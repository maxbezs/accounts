import { DocumentNode } from 'graphql';
/**
 * Utility function used to modify the current query Document.
 * We remove the existing the user fragment and add the one provided by the user.
 * Graphql-codegen add the fragment as the end of the definition array.
 */
export declare const replaceUserFieldsFragment: (document: DocumentNode, userFieldsFragment: DocumentNode) => {
    definitions: import("graphql").DefinitionNode[];
    kind: "Document";
    loc?: import("graphql").Location | undefined;
};
