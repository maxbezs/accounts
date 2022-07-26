import accountsBoost from '@maxbezs/boost';

(async () => {
  const accounts = await accountsBoost({
    tokenSecret: 'terrible secret',
  });

  const accountsServer = await accounts.listen();
})();
