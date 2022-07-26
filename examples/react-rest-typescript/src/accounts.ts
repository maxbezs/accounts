import { AccountsClient } from '@maxbezs/client';
import { AccountsClientPassword } from '@maxbezs/client-password';
import { RestClient } from '@maxbezs/rest-client';

const accountsRest = new RestClient({
  apiHost: process.env.REACT_APP_API_URL!,
  rootPath: '/accounts',
});
const accountsClient = new AccountsClient({}, accountsRest);
const accountsPassword = new AccountsClientPassword(accountsClient);

export { accountsClient, accountsRest, accountsPassword };
