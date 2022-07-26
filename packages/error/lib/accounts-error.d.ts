export default class AccountsError extends Error {
    packageName?: string;
    functionName?: string;
    reason?: string;
    constructor(packageName?: string, functionName?: string, reason?: string);
}
