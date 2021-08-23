import { Model, DataType, DataTypes } from "sequelize";
import sequelize from "lib/db";

const User = sequelize.define('User', {
  nick: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {})

export default User;