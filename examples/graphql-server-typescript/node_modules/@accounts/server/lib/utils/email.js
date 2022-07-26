"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.emailTemplates = void 0;
exports.emailTemplates = {
    from: 'accounts-js <no-reply@accounts-js.com>',
    verifyEmail: {
        subject: () => 'Verify your account email',
        text: (user, url) => `To verify your account email please click on this link: ${url}`,
        html: (user, url) => `To verify your account email please <a href="${url}">click here</a>.`,
    },
    resetPassword: {
        subject: () => 'Reset your password',
        text: (user, url) => `To reset your password please click on this link: ${url}`,
        html: (user, url) => `To reset your password please <a href="${url}">click here</a>.`,
    },
    enrollAccount: {
        subject: () => 'Set your password',
        text: (user, url) => `To set your password please click on this link: ${url}`,
        html: (user, url) => `To set your password please <a href="${url}">click here</a>.`,
    },
    passwordChanged: {
        subject: () => 'Your password has been changed',
        text: () => `Your account password has been successfully changed`,
        html: () => `Your account password has been successfully changed.`,
    },
    magicLink: {
        subject: () => 'Your magic link',
        text: (user, url) => `To log in please click on this link: ${url}`,
        html: (user, url) => `To log in please <a href="${url}">click here</a>.`,
    },
};
const sendMail = async (mail) => {
    console.warn('No configuration for email, you must set an email configuration');
    console.warn('Documentation: https://www.accountsjs.com/docs/email');
    console.log(mail);
};
exports.sendMail = sendMail;
//# sourceMappingURL=email.js.map