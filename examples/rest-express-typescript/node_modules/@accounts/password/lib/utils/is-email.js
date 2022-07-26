"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = void 0;
const isEmail = (email) => {
    const re = 
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Boolean(email && re.test(email));
};
exports.isEmail = isEmail;
//# sourceMappingURL=is-email.js.map