const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");

class Styles extends Model {}

Styles.init(
  {
    style: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
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
