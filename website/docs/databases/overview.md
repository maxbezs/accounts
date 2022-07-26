---
id: overview
title: Overview
sidebar_label: Overview
---

The accounts-js database adapters provide a way to interact with any database by implementing the `DatabaseInterface` common interface exported by `@maxbezs/types`. It means that if we don't provide an official adapter for your database, an adapter can be created to make accounts-js work with your database.

The following adapters are officially supported:

- [@maxbezs/mongo](/docs/databases/mongo) - A database adapter for [MongoDB](https://www.mongodb.com/)
- [@maxbezs/redis](/docs/databases/redis) - A database adapter for [Redis](https://redis.io/) (session only)
- [@maxbezs/typeorm](/docs/databases/typeorm) - A database adapter for [PostgreSQL](https://www.postgresql.org/) using [TypeORM](https://typeorm.io/)
