const express = require("express");
const router = express.Router();
const users = require("./usersR");
const styles = require("./stylesR");
const favorites = require("./favoritesR");

router.use("/users", users);
router.use("/styles", styles);
router.use("/favorites", favorites);

module.exports = router;
