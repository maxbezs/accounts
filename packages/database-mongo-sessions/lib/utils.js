"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMongoID = void 0;
const mongodb_1 = require("mongodb");
const toMongoID = (objectId) => {
    if (typeof objectId === 'string') {
        return new mongodb_1.ObjectID(objectId);
    }
    return objectId;
};
exports.toMongoID = toMongoID;
//# sourceMappingURL=utils.js.map