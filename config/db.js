const Sequelize = require("sequelize");

const db = new Sequelize(
  "ujhgttgs",
  "ujhgttgs",
  "uiM3it79Fa3gfR4P-2x-zAS_ts30L2hN",
  {
    host: "isilo.db.elephantsql.com",
    dialect: "postgres",
    logging: false,
    timezone: "-03:00",
  }
);

module.exports = db;
