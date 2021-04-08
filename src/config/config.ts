import "dotenv/config";

const dbConfig: any = {
  development: {
    databases: {
      rest: {
        database: process.env.PG_DB_DEV,
        username: process.env.PG_USER,
        password: process.env.PG_PASS,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: "postgres",
      },
    },
  },
  production: {
    databases: {
      rest: {
        database: process.env.PG_DB_PROD,
        username: process.env.PG_USER,
        password: process.env.PG_PASS,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: "postgres",
      },
    },
  },
};

export = dbConfig;
