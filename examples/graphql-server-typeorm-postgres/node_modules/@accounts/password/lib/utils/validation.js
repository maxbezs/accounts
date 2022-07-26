"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.isString = void 0;
const isString = (x) => {
    return typeof x === 'string';
};
exports.isString = isString;
const isObject = (x) => {
    return x !== null && typeof x === 'object';
};
exports.isObject = isObject;
//# sourceMappingURL=validation.js.map