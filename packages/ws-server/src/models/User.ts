import { Model, DataTypes, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

import { sequelize } from '../config';

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public username!: string;
  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  async generatePasswordHash(): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

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
        isEmail: {
          msg: 'email has an invalid format',
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'username must not be empty',
        },
        len: [5, 20],
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

User.beforeCreate(async (user) => {
  user.password = await user.generatePasswordHash();
});

export default User;
