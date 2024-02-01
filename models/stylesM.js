const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");

class Styles extends Model {}

Styles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "styles",
  }
);

module.exports = Styles;
