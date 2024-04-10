const express = require("express");
const styles = express.Router();
const { Styles } = require("../models");

//guardar un estilo
styles.post("/register", (req, res) => {
  const { theme, mode, color } = req.body;

  Styles.findOrCreate({ where: { style: theme, format: mode, color } })
    .then((sty) => res.send(sty))
    .catch((err) => res.send(err));
});

//encontrar un estilo
styles.get("/", (req, res) => {
  const { theme, mode, color } = req.query;

  Styles.findOne({ where: { style: theme, format: mode, color } })
    .then((ok) => res.send(ok))
    .catch((err) => res.send(err));
});

//borrar un estilo
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
