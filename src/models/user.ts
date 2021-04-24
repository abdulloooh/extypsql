import _ from "lodash";
import { hash, verify } from "argon2";
import type { CreateUser } from "../config/interfaces";

const public_fileds = ["username", "password"];
module.exports = (sequelize: any, DataTypes: any) => {
  const User = sequelize.define(
    "user",
    {
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
    },
    {
      instanceMethods: {
        generateHash: async function (password: string) {
          return await hash(password);
        },
        //@ts-expect-error
        isValidPass: async function (password: string) {
          //@ts-expect-error
          return await verify(password, this.password);
        },
        transformEntity: function () {
          return _.pick(this, public_fileds);
        },
      },
      hooks: {
        beforeCreate: async (user: CreateUser) => {
          user.password = await hash(user.password);
        },
      },
      timestamps: true,
      freezeTableName: true,
    }
  );

  User.sync();

  return User;
};
