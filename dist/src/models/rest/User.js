"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = require("argon2");
const user = (sequelize, Sequelize, DataTypes) => {
    const User = Sequelize.define("user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
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
        timestamps: true,
        freezeTableName: true,
    });
    User.generateHash = async function (password) {
        return await argon2_1.hash(password);
    };
    User.validPassword = async function (password) {
        return await argon2_1.verify(password, this.password);
    };
    User.sync();
    return User;
};
exports.default = user;
