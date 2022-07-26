---
id: rest-client
title: Rest Client
sidebar_label: Client
---

[Github](https://github.com/accounts-js/accounts/tree/master/packages/rest-client) |
[npm](https://www.npmjs.com/package/@maxbezs/rest-client)

_REST client for accounts-js_

### Install

```
yarn add @maxbezs/rest-client
```

### Usage

```javascript
import { AccountsClient } from '@maxbezs/client';
import { RestClient } from '@maxbezs/rest-client';

const accountsRest = new RestClient({
  apiHost: 'http://localhost:4000',
  rootPath: '/accounts',
});
const accounts = new AccountsClient({}, accountsRest);
```

### Options

```javascript
const options = {
  apiHost: string,
  // Path that prefix the accounts-js routes
  rootPath: string,
};
```
