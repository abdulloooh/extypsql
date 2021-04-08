"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("dotenv/config");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config_1 = __importDefault(require("../config/config"));
const config = config_1.default[process.env.NODE_ENV || "development"];
let db = {};
const databases = Object.keys(config.databases);
for (let i = 0; i < databases.length; i++) {
    var database = databases[i];
    let dbPath = config.databases[database];
    db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, {
        host: dbPath.host,
        dialect: dbPath.dialect,
        models: [__dirname + "/rest"],
    });
}
module.exports = db;
