import { Model, DataType, DataTypes } from "sequelize";
import sequelize from "lib/db";
import User from "./user";

const History = sequelize.define('History', {
  expression: {
    type: DataTypes.STRING,
    allowNull: false
  },
  result: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {})

History.belongsTo(User);
export default History;