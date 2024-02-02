const express = require("express");
const users = express.Router();
const { Users } = require("../models");
const { generateToken, validateToken } = require("../config/tokens.js");
const transporter = require("../utils/mail");

users.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  Users.findOrCreate({
    where: { email },
    defaults: { name, password },
  })
    .then((user) => res.send(user).status(200))
    .catch((err) => res.send(err).status(400));
});

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
          lastname: user.lastname,
          email: user.email,
        };

        const token = generateToken(payload);

        res.cookie("token", token);
        res.send(payload);
      });
    })
    .catch((err) => res.send(err));
});

//devuelve 1 user
//         ?
users.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findOne({ where: { id } })
    .then((one) => res.send(one).status(200))
    .catch((err) => res.send(err).status(400));
});

users.post("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  const { payload } = validateToken(token);
  if (!payload) return res.sendStatus(401);
  res.send(payload);
});

users.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

users.post("/confirm/:email", (req, res) => {
  const { email } = req.params;

  const mailOptions = {
    from: "brandoncastillo.09@gmail.com",
    to: email,
    subject: "Registro Carbon Copy",
    html: `<h1 style="color: blue;"> Confirme su registro en Carbon Copy</h1>
    <p>Ingrese a este link para confirmar su email! <a href='https://www.google.com.ar' target='_blank'> link! </></p> 
    <p>Gracias por registarse! 📝</p>
   <p>Saludos 👋</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) res.send(err);
    else res.send(info);
  });
});

users.post("/forgot/:email", (req, res) => {
  const { email } = req.params;

  const mailOptions = {
    from: "brandoncastillo.09@gmail.com",
    to: email,
    subject: "Cancelación de Cita - House of Dev",
    html: `<h1 style="color: blue;"> Su cita ha sido!</h1> <p> Usted o el propietario ha cancelado la cita. Para más información ingrese al sitio web. </p>
  </p> <p>Saludos!</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) res.send(err);
    else res.send(info);
  });
});

module.exports = users;
