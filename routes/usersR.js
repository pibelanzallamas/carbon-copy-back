const express = require("express");
const users = express.Router();
const { Users } = require("../models");
const { generateToken, validateToken } = require("../config/tokens.js");
const transporter = require("../utils/mail");
const dotenv = require("dotenv");

//registrarse
users.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  Users.findOrCreate({
    where: { email },
    defaults: { name, password },
  })
    .then((user) => res.send(user).status(200))
    .catch((err) => res.send(err).status(400));
});

//che cookie
users.post("/me", (req, res) => {
  const token = req.body.token;
  if (!token) return res.sendStatus(401);
  const { payload } = validateToken(token);
  if (!payload) return res.sendStatus(401);
  res.send(payload);
});

//loguearse
users.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } })
    .then((user) => {
      if (!user) return res.sendStatus(401); //usuario no registrado

      user.validatePassword(password).then((isValid) => {
        if (!isValid) return res.sendStatus(401); //contrasenia incorrecta

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        const token = generateToken(payload);

        res.send({ payload, token });
      });
    })
    .catch((err) => res.send(err));
});

//buscar un usuario x id
users.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findOne({ where: { id } })
    .then((one) => res.send(one).status(200))
    .catch((err) => res.send(err).status(400));
});

//mandar codigo via email
users.post("/forgot/:email", (req, res) => {
  dotenv.config();
  const { email } = req.params;
  let id;

  Users.findOne({ where: { email } })
    .then((data) => {
      id = data.dataValues.id;

      function randomnaizer() {
        let caracteresPermitidos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let cadenaRandom = "";
        for (let i = 0; i < 5; i++) {
          let indiceAleatorio = Math.floor(
            Math.random() * caracteresPermitidos.length
          );
          cadenaRandom += caracteresPermitidos.charAt(indiceAleatorio);
        }
        return cadenaRandom;
      }
      const codigo = randomnaizer();

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Codigo de recuperación - Carbon Copy",
        html: `<h1 style="color: blue;"> Código de Recuperación!</h1>
        <p> Usted ha pedido un código de recuperación para su contraseña,
        su nueva contraseña es: ${codigo}</p>
        <p>Gracias, - Carbon Copy.</p>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) res.send(err);
        else res.send([id, codigo]);
      });
    })
    .catch((err) => res.send(err));
});

//mod user con pass
users.put("/pass/:id", (req, res) => {
  const { id } = req.params;
  const { email, name, password } = req.body;

  Users.update(
    { email, name, password },
    { where: { id }, individualHooks: true }
  )
    .then((user) => {
      res.send(user);
      console.log(password, "pass con pass");
    })
    .catch((err) => res.send(err));
});

//mod user sin pass
users.put("/:id", (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;

  Users.update({ email, name }, { where: { id }, individualHooks: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = users;
