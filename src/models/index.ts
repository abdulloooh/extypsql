import "dotenv/config";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

interface DB_PATH {
  database: string;
  username: string;
  password: string;
  host: string;
  port: string;
  dialect: "postgres";
}

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/sequelize.config")[env];

let db: any = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**Add the Database Models**/
fs.readdirSync(__dirname)
  .filter((file: string) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export = db;
