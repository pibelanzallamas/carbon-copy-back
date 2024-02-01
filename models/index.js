const Users = require("./usersM");
const Favorites = require("./favoritesM");
const Styles = require("./stylesM");

Users.hasMany(Favorites, { foreignKey: "uid" });
Styles.hasMany(Favorites, { foreignKey: "sid" });

Favorites.belongsTo(Users, { foreignKey: "uid" });
Favorites.belongsTo(Styles, { foreignKey: "sid" });

module.exports = { Users, Styles, Favorites };
