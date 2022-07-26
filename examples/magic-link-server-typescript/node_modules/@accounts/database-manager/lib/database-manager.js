"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseManager = void 0;
class DatabaseManager {
    constructor(configuration) {
        this.validateConfiguration(configuration);
        this.userStorage = configuration.userStorage;
        this.sessionStorage = configuration.sessionStorage;
    }
    validateConfiguration(configuration) {
        if (!configuration) {
            throw new Error('[ Accounts - DatabaseManager ] configuration : A configuration object is required on DatabaseManager');
        }
        if (!configuration.userStorage) {
            throw new Error('[ Accounts - DatabaseManager ] configuration : A userStorage DatabaseInterface is required');
        }
        if (!configuration.sessionStorage) {
            throw new Error('[ Accounts - DatabaseManager ] configuration : A sessionStorage DatabaseInterface is required');
        }
    }
    // Return the createUser function from the userStorage
    get createUser() {
        return this.userStorage.createUser.bind(this.userStorage);
    }
    // Return the findUserById function from the userStorage
    get findUserById() {
        return this.userStorage.findUserById.bind(this.userStorage);
    }
    // Return the findUserByEmail function from the userStorage
    get findUserByEmail() {
        return this.userStorage.findUserByEmail.bind(this.userStorage);
    }
    // Return the findUserByUsername function from the userStorage
    get findUserByUsername() {
        return this.userStorage.findUserByUsername.bind(this.userStorage);
    }
    // Return the findPasswordHash function from the userStorage
    get findPasswordHash() {
        return this.userStorage.findPasswordHash.bind(this.userStorage);
    }
    // Return the findUserByEmailVerificationToken function from the userStorage
    get findUserByEmailVerificationToken() {
        return this.userStorage.findUserByEmailVerificationToken.bind(this.userStorage);
    }
    // Return the findUserByResetPasswordToken function from the userStorage
    get findUserByResetPasswordToken() {
        return this.userStorage.findUserByResetPasswordToken.bind(this.userStorage);
    }
    // Return the findUserByServiceId function from the userStorage
    get findUserByServiceId() {
        return this.userStorage.findUserByServiceId.bind(this.userStorage);
    }
    // Return the addEmail function from the userStorage
    get addEmail() {
        return this.userStorage.addEmail.bind(this.userStorage);
    }
    // Return the removeEmail function from the userStorage
    get removeEmail() {
        return this.userStorage.removeEmail.bind(this.userStorage);
    }
    // Return the verifyEmail function from the userStorage
    get verifyEmail() {
        return this.userStorage.verifyEmail.bind(this.userStorage);
    }
    // Return the setUsername function from the userStorage
    get setUsername() {
        return this.userStorage.setUsername.bind(this.userStorage);
    }
    // Return the setPassword function from the userStorage
    get setPassword() {
        return this.userStorage.setPassword.bind(this.userStorage);
    }
    // Return the setService function from the userStorage
    get setService() {
        return this.userStorage.setService.bind(this.userStorage);
    }
    // Return the unsetService function from the userStorage
    get unsetService() {
        return this.userStorage.unsetService.bind(this.userStorage);
    }
    // Return the createSession function from the sessionStorage
    get createSession() {
        return this.sessionStorage.createSession.bind(this.sessionStorage);
    }
    // Return the updateSession function from the sessionStorage
    get updateSession() {
        return this.sessionStorage.updateSession.bind(this.sessionStorage);
    }
    // Return the invalidateSession function from the sessionStorage
    get invalidateSession() {
        return this.sessionStorage.invalidateSession.bind(this.sessionStorage);
    }
    // Return the invalidateAllSessions function from the sessionStorage
    get invalidateAllSessions() {
        return this.sessionStorage.invalidateAllSessions.bind(this.sessionStorage);
    }
    // Return the removeAllResetPasswordTokens function from the sessionStorage
    get removeAllResetPasswordTokens() {
        return this.userStorage.removeAllResetPasswordTokens.bind(this.userStorage);
    }
    // Return the findSessionByToken function from the sessionStorage
    get findSessionByToken() {
        return this.sessionStorage.findSessionByToken.bind(this.sessionStorage);
    }
    // Return the findSessionById function from the sessionStorage
    get findSessionById() {
        return this.sessionStorage.findSessionById.bind(this.sessionStorage);
    }
    // Return the addEmailVerificationToken function from the userStorage
    get addEmailVerificationToken() {
        return this.userStorage.addEmailVerificationToken.bind(this.userStorage);
    }
    // Return the addResetPasswordToken function from the userStorage
    get addResetPasswordToken() {
        return this.userStorage.addResetPasswordToken.bind(this.userStorage);
    }
    // Return the setUserDeactivated function from the userStorage
    get setUserDeactivated() {
        return this.userStorage.setUserDeactivated.bind(this.userStorage);
    }
    // Return the findUserByLoginToken function from the userStorage
    get findUserByLoginToken() {
        return this.userStorage.findUserByLoginToken.bind(this.userStorage);
    }
    // Return the addLoginToken function from the userStorage
    get addLoginToken() {
        return this.userStorage.addLoginToken.bind(this.userStorage);
    }
    // Return the addLoginToken function from the userStorage
    get removeAllLoginTokens() {
        return this.userStorage.removeAllLoginTokens.bind(this.userStorage);
    }
}
exports.DatabaseManager = DatabaseManager;
//# sourceMappingURL=database-manager.js.map