"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceUserFieldsFragment = void 0;
var tslib_1 = require("tslib");
/**
 * Utility function used to modify the current query Document.
 * We remove the existing the user fragment and add the one provided by the user.
 * Graphql-codegen add the fragment as the end of the definition array.
 */
var replaceUserFieldsFragment = function (document, userFieldsFragment) {
    return (0, tslib_1.__assign)((0, tslib_1.__assign)({}, document), { definitions: (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], document.definitions.slice(0, -1), true), userFieldsFragment.definitions, true) });
};
exports.replaceUserFieldsFragment = replaceUserFieldsFragment;
//# sourceMappingURL=replace-user-fragment.js.map