"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = require("argon2");
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
            // @ts-ignore
            validPassword: async function (password) {
                // @ts-ignore
                return await argon2_1.verify(password, this.password);
            },
        },
        timestamps: true,
        freezeTableName: true,
    });
    User.sync();
    return User;
};
