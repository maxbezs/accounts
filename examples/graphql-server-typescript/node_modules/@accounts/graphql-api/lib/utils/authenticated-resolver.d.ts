export declare const authenticated: <CustomRoot, CustomArgs, CustomContext extends {
    skipJSAccountsVerification?: Boolean | undefined;
    userId?: any;
    user?: any;
}, Info, ReturnType_1>(func: (root: CustomRoot, args: CustomArgs, context: CustomContext, info: Info) => ReturnType_1 | Promise<ReturnType_1>) => (root: CustomRoot, args: CustomArgs, context: CustomContext, info: Info) => Promise<ReturnType_1>;
