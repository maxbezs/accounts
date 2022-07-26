---
title: Twitter
---

[Github](https://github.com/accounts-js/accounts/tree/master/packages/oauth-twitter) |
[npm](https://www.npmjs.com/package/@maxbezs/oauth-twitter)

_OAuth Twitter Strategy for accounts-js_

## Install

```
yarn add @maxbezs/oauth @maxbezs/oauth-twitter
```

## Usage

```javascript
import AccountsServer from '@maxbezs/server';
import AccountsOauth from '@maxbezs/oauth';
import AccountsOAuthTwitter from '@maxbezs/oauth-twitter';

const accountsOauth = new AccountsOauth({
  twitter: {
    key: 'your-twitter-consumer-key',
    secret: 'your-twitter-consumer-secret',
  },
));

const accountsServer = new AccountsServer(...config, {
  password: password,
  oauth: accountsOauth,
});
```
