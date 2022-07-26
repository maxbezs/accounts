import { createConnection } from 'typeorm';

export const connect = (url = process.env.DATABASE_URL) => {
  return createConnection({
    type: 'postgres',
    url,
    entities: [...require('@maxbezs/typeorm').entities],
    synchronize: true,
  }).then((connection) => {
    return connection;
  });
};
