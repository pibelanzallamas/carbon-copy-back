const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db");
const routes = require("./routes");
const models = require("./models");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);
dotenv.config();

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: false })
  .then(function () {
    console.log("Base de datos conectada correctamente!");
    app.listen(3000, () =>
      console.log("Servidor escuchando en el puerto 3000")
    );
  })
  .catch(console.error);
