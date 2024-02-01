const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "brandoncastillo.09@gmail.com",
    pass: "mlbc apid qgpt pmxq",
  },
});

module.exports = transporter;
