import { hash, verify } from "argon2";

const user = (sequelize: any, Sequelize: any, DataTypes: any) => {
  const User = Sequelize.define(
    "user",
    {
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
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  User.generateHash = async function (password: string) {
    return await hash(password);
  };

  User.validPassword = async function (password: string) {
    return await verify(password, this.password);
  };

  User.sync();
  return User;
};

export default user;
