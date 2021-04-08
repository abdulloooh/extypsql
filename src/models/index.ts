import "dotenv/config";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

import configVars from "../config/config";

interface DB_PATH {
  database: string;
  username: string;
  password: string;
  host: string;
  port: string;
  dialect: "postgres";
}

const config = configVars[process.env.NODE_ENV || "development"];

let db: any = {};

const databases = Object.keys(config.databases);

for (let i = 0; i < databases.length; i++) {
  var database = databases[i];
  let dbPath: DB_PATH = config.databases[database];
  db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, {
    host: dbPath.host,
    dialect: dbPath.dialect,
    models: [__dirname + "/rest"],
  });
}

/**Add the Database Models**/
// fs.readdirSync(__dirname + "/rest")
//   .filter((file: string) => {
//     return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
//   })
//   .forEach((file: string) => {
//     console.log({ what: path.join(__dirname + "/rest", file) });
//     var model = db[database]["import"](path.join(__dirname + "/rest", file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

export = db;
