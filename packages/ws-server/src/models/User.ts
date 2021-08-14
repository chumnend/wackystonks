import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../config';

interface UserAttributes {
  id: number;
  email: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public username!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static async findByLogin(login: string): Promise<User> {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email must not be empty',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'username must not be empty',
        },
      },
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
  },
);

export default User;
