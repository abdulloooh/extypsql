"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const argon2_1 = require("argon2");
const public_fileds = ["username", "password"];
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        instanceMethods: {
            generateHash: async function (password) {
                return await argon2_1.hash(password);
            },
            //@ts-expect-error
            isValidPass: async function (password) {
                //@ts-expect-error
                return await argon2_1.verify(password, this.password);
            },
            transformEntity: function () {
                return lodash_1.default.pick(this, public_fileds);
            },
        },
        hooks: {
            beforeCreate: async (user) => {
                user.password = await argon2_1.hash(user.password);
            },
        },
        timestamps: true,
        freezeTableName: true,
    });
    User.sync();
    return User;
};
