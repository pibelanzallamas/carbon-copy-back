const express = require("express");
const favorites = express.Router();
const { Favorites, Styles } = require("../models");

favorites.post("/register", (req, res) => {
  const { uid, sid } = req.body;

  Favorites.findOrCreate({ where: { uid, sid } })
    .then((fav) => res.send(fav))
    .catch((err) => res.send(err));
});

//check 1 fav
favorites.get("/find", (req, res) => {
  const { uid, sid } = req.query;

  Favorites.findOne({ where: { sid, uid } })
    .then((fav) => res.send(fav))
    .catch((err) => res.send(err));
});

//1 user favs
favorites.get("/:uid", (req, res) => {
  const { uid } = req.params;

  Favorites.findAll({
    where: { uid },
    include: Styles,
    order: [["id", "DESC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

//dislike
favorites.delete("/delete", (req, res) => {
  const { uid, sid } = req.body;

  Favorites.destroy({ where: { uid, sid } })
    .then((add) => {
      if (add > 0) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    })
    .catch((err) => console.log("err", err));
});

module.exports = favorites;
