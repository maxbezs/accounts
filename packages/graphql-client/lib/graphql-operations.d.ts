import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type AuthenticateParamsInput = {
    access_token?: Maybe<Scalars['String']>;
    access_token_secret?: Maybe<Scalars['String']>;
    code?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    provider?: Maybe<Scalars['String']>;
    token?: Maybe<Scalars['String']>;
    user?: Maybe<UserInput>;
};
export declare type CreateUserInput = {
    email?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
};
export declare type CreateUserResult = {
    __typename?: 'CreateUserResult';
    loginResult?: Maybe<LoginResult>;
    userId?: Maybe<Scalars['ID']>;
};
export declare type EmailRecord = {
    __typename?: 'EmailRecord';
    address?: Maybe<Scalars['String']>;
    verified?: Maybe<Scalars['Boolean']>;
};
export declare type ImpersonateReturn = {
    __typename?: 'ImpersonateReturn';
    authorized?: Maybe<Scalars['Boolean']>;
    tokens?: Maybe<Tokens>;
    user?: Maybe<User>;
};
export declare type ImpersonationUserIdentityInput = {
    email?: Maybe<Scalars['String']>;
    userId?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
};
export declare type LoginResult = {
    __typename?: 'LoginResult';
    sessionId?: Maybe<Scalars['String']>;
    tokens?: Maybe<Tokens>;
    user?: Maybe<User>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    addEmail?: Maybe<Scalars['Boolean']>;
    authenticate?: Maybe<LoginResult>;
    changePassword?: Maybe<Scalars['Boolean']>;
    createUser?: Maybe<CreateUserResult>;
    impersonate?: Maybe<ImpersonateReturn>;
    logout?: Maybe<Scalars['Boolean']>;
    refreshTokens?: Maybe<LoginResult>;
    requestMagicLinkEmail?: Maybe<Scalars['Boolean']>;
    resetPassword?: Maybe<LoginResult>;
    sendResetPasswordEmail?: Maybe<Scalars['Boolean']>;
    sendVerificationEmail?: Maybe<Scalars['Boolean']>;
    twoFactorSet?: Maybe<Scalars['Boolean']>;
    twoFactorUnset?: Maybe<Scalars['Boolean']>;
    verifyAuthentication?: Maybe<Scalars['Boolean']>;
    verifyEmail?: Maybe<Scalars['Boolean']>;
};
export declare type MutationAddEmailArgs = {
    newEmail: Scalars['String'];
};
export declare type MutationAuthenticateArgs = {
    params: AuthenticateParamsInput;
    serviceName: Scalars['String'];
};
export declare type MutationChangePasswordArgs = {
    newPassword: Scalars['String'];
    oldPassword: Scalars['String'];
};
export declare type MutationCreateUserArgs = {
    user: CreateUserInput;
};
export declare type MutationImpersonateArgs = {
    accessToken: Scalars['String'];
    impersonated: ImpersonationUserIdentityInput;
};
export declare type MutationRefreshTokensArgs = {
    accessToken: Scalars['String'];
    refreshToken: Scalars['String'];
};
export declare type MutationRequestMagicLinkEmailArgs = {
    email: Scalars['String'];
};
export declare type MutationResetPasswordArgs = {
    newPassword: Scalars['String'];
    token: Scalars['String'];
};
export declare type MutationSendResetPasswordEmailArgs = {
    email: Scalars['String'];
};
export declare type MutationSendVerificationEmailArgs = {
    email: Scalars['String'];
};
export declare type MutationTwoFactorSetArgs = {
    code: Scalars['String'];
    secret: TwoFactorSecretKeyInput;
};
export declare type MutationTwoFactorUnsetArgs = {
    code: Scalars['String'];
};
export declare type MutationVerifyAuthenticationArgs = {
    params: AuthenticateParamsInput;
    serviceName: Scalars['String'];
};
export declare type MutationVerifyEmailArgs = {
    token: Scalars['String'];
};
export declare type Query = {
    __typename?: 'Query';
    getUser?: Maybe<User>;
    twoFactorSecret?: Maybe<TwoFactorSecretKey>;
};
export declare type Tokens = {
    __typename?: 'Tokens';
    accessToken?: Maybe<Scalars['String']>;
    refreshToken?: Maybe<Scalars['String']>;
};
export declare type TwoFactorSecretKey = {
    __typename?: 'TwoFactorSecretKey';
    ascii?: Maybe<Scalars['String']>;
    base32?: Maybe<Scalars['String']>;
    google_auth_qr?: Maybe<Scalars['String']>;
    hex?: Maybe<Scalars['String']>;
    otpauth_url?: Maybe<Scalars['String']>;
    qr_code_ascii?: Maybe<Scalars['String']>;
    qr_code_base32?: Maybe<Scalars['String']>;
    qr_code_hex?: Maybe<Scalars['String']>;
};
export declare type TwoFactorSecretKeyInput = {
    ascii?: Maybe<Scalars['String']>;
    base32?: Maybe<Scalars['String']>;
    google_auth_qr?: Maybe<Scalars['String']>;
    hex?: Maybe<Scalars['String']>;
    otpauth_url?: Maybe<Scalars['String']>;
    qr_code_ascii?: Maybe<Scalars['String']>;
    qr_code_base32?: Maybe<Scalars['String']>;
    qr_code_hex?: Maybe<Scalars['String']>;
};
export declare type User = {
    __typename?: 'User';
    emails?: Maybe<Array<EmailRecord>>;
    id: Scalars['ID'];
    username?: Maybe<Scalars['String']>;
};
export declare type UserInput = {
    email?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['ID']>;
    username?: Maybe<Scalars['String']>;
};
export declare type UserFieldsFragment = {
    __typename?: 'User';
    id: string;
    username?: string | null | undefined;
    emails?: Array<{
        __typename?: 'EmailRecord';
        address?: string | null | undefined;
        verified?: boolean | null | undefined;
    }> | null | undefined;
};
export declare type AddEmailMutationVariables = Exact<{
    newEmail: Scalars['String'];
}>;
export declare type AddEmailMutation = {
    __typename?: 'Mutation';
    addEmail?: boolean | null | undefined;
};
export declare type AuthenticateWithServiceMutationVariables = Exact<{
    serviceName: Scalars['String'];
    params: AuthenticateParamsInput;
}>;
export declare type AuthenticateWithServiceMutation = {
    __typename?: 'Mutation';
    verifyAuthentication?: boolean | null | undefined;
};
export declare type ChangePasswordMutationVariables = Exact<{
    oldPassword: Scalars['String'];
    newPassword: Scalars['String'];
}>;
export declare type ChangePasswordMutation = {
    __typename?: 'Mutation';
    changePassword?: boolean | null | undefined;
};
export declare type CreateUserMutationVariables = Exact<{
    user: CreateUserInput;
}>;
export declare type CreateUserMutation = {
    __typename?: 'Mutation';
    createUser?: {
        __typename?: 'CreateUserResult';
        userId?: string | null | undefined;
        loginResult?: {
            __typename?: 'LoginResult';
            sessionId?: string | null | undefined;
            tokens?: {
                __typename?: 'Tokens';
                refreshToken?: string | null | undefined;
                accessToken?: string | null | undefined;
            } | null | undefined;
            user?: {
                __typename?: 'User';
                id: string;
                username?: string | null | undefined;
                emails?: Array<{
                    __typename?: 'EmailRecord';
                    address?: string | null | undefined;
                    verified?: boolean | null | undefined;
                }> | null | undefined;
            } | null | undefined;
        } | null | undefined;
    } | null | undefined;
};
export declare type ImpersonateMutationVariables = Exact<{
    accessToken: Scalars['String'];
    impersonated: ImpersonationUserIdentityInput;
}>;
export declare type ImpersonateMutation = {
    __typename?: 'Mutation';
    impersonate?: {
        __typename?: 'ImpersonateReturn';
        authorized?: boolean | null | undefined;
        tokens?: {
            __typename?: 'Tokens';
            refreshToken?: string | null | undefined;
            accessToken?: string | null | undefined;
        } | null | undefined;
        user?: {
            __typename?: 'User';
            id: string;
            username?: string | null | undefined;
            emails?: Array<{
                __typename?: 'EmailRecord';
                address?: string | null | undefined;
                verified?: boolean | null | undefined;
            }> | null | undefined;
        } | null | undefined;
    } | null | undefined;
};
export declare type AuthenticateMutationVariables = Exact<{
    serviceName: Scalars['String'];
    params: AuthenticateParamsInput;
}>;
export declare type AuthenticateMutation = {
    __typename?: 'Mutation';
    authenticate?: {
        __typename?: 'LoginResult';
        sessionId?: string | null | undefined;
        tokens?: {
            __typename?: 'Tokens';
            refreshToken?: string | null | undefined;
            accessToken?: string | null | undefined;
        } | null | undefined;
        user?: {
            __typename?: 'User';
            id: string;
            username?: string | null | undefined;
            emails?: Array<{
                __typename?: 'EmailRecord';
                address?: string | null | undefined;
                verified?: boolean | null | undefined;
            }> | null | undefined;
        } | null | undefined;
    } | null | undefined;
};
export declare type LogoutMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type LogoutMutation = {
    __typename?: 'Mutation';
    logout?: boolean | null | undefined;
};
export declare type RefreshTokensMutationVariables = Exact<{
    accessToken: Scalars['String'];
    refreshToken: Scalars['String'];
}>;
export declare type RefreshTokensMutation = {
    __typename?: 'Mutation';
    refreshTokens?: {
        __typename?: 'LoginResult';
        sessionId?: string | null | undefined;
        tokens?: {
            __typename?: 'Tokens';
            refreshToken?: string | null | undefined;
            accessToken?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
};
export declare type RequestMagicLinkEmailMutationVariables = Exact<{
    email: Scalars['String'];
}>;
export declare type RequestMagicLinkEmailMutation = {
    __typename?: 'Mutation';
    requestMagicLinkEmail?: boolean | null | undefined;
};
export declare type ResetPasswordMutationVariables = Exact<{
    token: Scalars['String'];
    newPassword: Scalars['String'];
}>;
export declare type ResetPasswordMutation = {
    __typename?: 'Mutation';
    resetPassword?: {
        __typename?: 'LoginResult';
        sessionId?: string | null | undefined;
        tokens?: {
            __typename?: 'Tokens';
            refreshToken?: string | null | undefined;
            accessToken?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
};
export declare type SendResetPasswordEmailMutationVariables = Exact<{
    email: Scalars['String'];
}>;
export declare type SendResetPasswordEmailMutation = {
    __typename?: 'Mutation';
    sendResetPasswordEmail?: boolean | null | undefined;
};
export declare type SendVerificationEmailMutationVariables = Exact<{
    email: Scalars['String'];
}>;
export declare type SendVerificationEmailMutation = {
    __typename?: 'Mutation';
    sendVerificationEmail?: boolean | null | undefined;
};
export declare type TwoFactorSetMutationVariables = Exact<{
    secret: TwoFactorSecretKeyInput;
    code: Scalars['String'];
}>;
export declare type TwoFactorSetMutation = {
    __typename?: 'Mutation';
    twoFactorSet?: boolean | null | undefined;
};
export declare type TwoFactorUnsetMutationVariables = Exact<{
    code: Scalars['String'];
}>;
export declare type TwoFactorUnsetMutation = {
    __typename?: 'Mutation';
    twoFactorUnset?: boolean | null | undefined;
};
export declare type VerifyEmailMutationVariables = Exact<{
    token: Scalars['String'];
}>;
export declare type VerifyEmailMutation = {
    __typename?: 'Mutation';
    verifyEmail?: boolean | null | undefined;
};
export declare type GetTwoFactorSecretQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetTwoFactorSecretQuery = {
    __typename?: 'Query';
    twoFactorSecret?: {
        __typename?: 'TwoFactorSecretKey';
        ascii?: string | null | undefined;
        base32?: string | null | undefined;
        hex?: string | null | undefined;
        qr_code_ascii?: string | null | undefined;
        qr_code_hex?: string | null | undefined;
        qr_code_base32?: string | null | undefined;
        google_auth_qr?: string | null | undefined;
        otpauth_url?: string | null | undefined;
    } | null | undefined;
};
export declare type GetUserQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetUserQuery = {
    __typename?: 'Query';
    getUser?: {
        __typename?: 'User';
        id: string;
        username?: string | null | undefined;
        emails?: Array<{
            __typename?: 'EmailRecord';
            address?: string | null | undefined;
            verified?: boolean | null | undefined;
        }> | null | undefined;
    } | null | undefined;
};
export declare const UserFieldsFragmentDoc: DocumentNode<UserFieldsFragment, unknown>;
export declare const AddEmailDocument: DocumentNode<AddEmailMutation, Exact<{
    newEmail: Scalars['String'];
}>>;
export declare const AuthenticateWithServiceDocument: DocumentNode<AuthenticateWithServiceMutation, Exact<{
    serviceName: Scalars['String'];
    params: AuthenticateParamsInput;
}>>;
export declare const ChangePasswordDocument: DocumentNode<ChangePasswordMutation, Exact<{
    oldPassword: Scalars['String'];
    newPassword: Scalars['String'];
}>>;
export declare const CreateUserDocument: DocumentNode<CreateUserMutation, Exact<{
    user: CreateUserInput;
}>>;
export declare const ImpersonateDocument: DocumentNode<ImpersonateMutation, Exact<{
    accessToken: Scalars['String'];
    impersonated: ImpersonationUserIdentityInput;
}>>;
export declare const AuthenticateDocument: DocumentNode<AuthenticateMutation, Exact<{
    serviceName: Scalars['String'];
    params: AuthenticateParamsInput;
}>>;
export declare const LogoutDocument: DocumentNode<LogoutMutation, Exact<{
    [key: string]: never;
}>>;
export declare const RefreshTokensDocument: DocumentNode<RefreshTokensMutation, Exact<{
    accessToken: Scalars['String'];
    refreshToken: Scalars['String'];
}>>;
export declare const RequestMagicLinkEmailDocument: DocumentNode<RequestMagicLinkEmailMutation, Exact<{
    email: Scalars['String'];
}>>;
export declare const ResetPasswordDocument: DocumentNode<ResetPasswordMutation, Exact<{
    token: Scalars['String'];
    newPassword: Scalars['String'];
}>>;
export declare const SendResetPasswordEmailDocument: DocumentNode<SendResetPasswordEmailMutation, Exact<{
    email: Scalars['String'];
}>>;
export declare const SendVerificationEmailDocument: DocumentNode<SendVerificationEmailMutation, Exact<{
    email: Scalars['String'];
}>>;
export declare const TwoFactorSetDocument: DocumentNode<TwoFactorSetMutation, Exact<{
    secret: TwoFactorSecretKeyInput;
    code: Scalars['String'];
}>>;
export declare const TwoFactorUnsetDocument: DocumentNode<TwoFactorUnsetMutation, Exact<{
    code: Scalars['String'];
}>>;
export declare const VerifyEmailDocument: DocumentNode<VerifyEmailMutation, Exact<{
    token: Scalars['String'];
}>>;
export declare const GetTwoFactorSecretDocument: DocumentNode<GetTwoFactorSecretQuery, Exact<{
    [key: string]: never;
}>>;
export declare const GetUserDocument: DocumentNode<GetUserQuery, Exact<{
    [key: string]: never;
}>>;
