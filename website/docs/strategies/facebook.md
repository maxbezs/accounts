---
title: Facebook
---

[Github](https://github.com/accounts-js/accounts/tree/master/packages/oauth-facebook) |
[npm](https://www.npmjs.com/package/@maxbezs/oauth-facebook)

_OAuth Facebook Strategy for accounts-js_

## Install

```
yarn add @maxbezs/oauth @maxbezs/oauth-facebook
```

## Usage

```javascript
import AccountsServer from '@maxbezs/server';
import AccountsOauth from '@maxbezs/oauth';
import AccountsOAuthFacebook from '@maxbezs/oauth-facebook';

const accountsOauth = new AccountsOauth({
  facebook: {
    key: 'your-facebook-client-id',
    secret: 'your-facebook-client-secret',
  },
));

const accountsServer = new AccountsServer(...config, {
  password: password,
  oauth: accountsOauth,
});
```
