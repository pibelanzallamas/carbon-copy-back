const express = require("express");
const styles = express.Router();
const { Styles, Users } = require("../models");

styles.post("/register", (req, res) => {
  const { uid, pid, rating, review } = req.body;

  Styles.findOrCreate({
    where: { uid, pid },
    defaults: { rating, review },
  })
    .then((rew) => res.send(rew))
    .catch((err) => res.send(err));
});

//todas
styles.get("/", (req, res) => {
  Styles.findAll()
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

//de acuerdo a una prop
styles.get("/:pid", (req, res) => {
  const { pid } = req.params;

  Styles.findAll({
    where: { pid },
    include: Users,
    order: [["id", "DESC"]],
  })
    .then((rev) => res.send(rev))
    .catch((err) => res.send(err));
});

//de acuerdo a un user
styles.get("/users/:uid", (req, res) => {
  const { uid } = req.params;

  Styles.findAll({ where: { uid }, include: Properties })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

styles.delete("/:id", (req, res) => {
  const { id } = req.params;

  Styles.destroy({ where: { id } })
    .then((filasAfectadas) => {
      if (filasAfectadas > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(202);
      }
    })
    .catch(() => res.sendStatus(400));
});

module.exports = styles;
