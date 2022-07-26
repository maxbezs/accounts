"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenStorageLocal = void 0;
exports.tokenStorageLocal = {
    setItem: function (key, value) {
        return localStorage.setItem(key, value);
    },
    getItem: function (key) {
        return localStorage.getItem(key);
    },
    removeItem: function (key) {
        return localStorage.removeItem(key);
    },
};
//# sourceMappingURL=token-storage-local.js.map