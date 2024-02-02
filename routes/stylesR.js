const express = require("express");
const styles = express.Router();
const { Styles } = require("../models");

//guardar un style
styles.post("/register", (req, res) => {
  const { style } = req.body;

  Styles.findOrCreate({ where: { style } })
    .then((sty) => res.send(sty))
    .catch((err) => res.send(err));
});

//devolver todos los styles
styles.get("/", (req, res) => {
  Styles.findAll()
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

//borrar un style
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
