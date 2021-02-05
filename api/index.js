require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const tasks = require("./routes/tasks");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();
/**
 * Fonction permettant de rajouter les "headers" qui permettent de décider
 * ce qui est possible et pas possible de faire avec les routes.
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-auth-token, Content-Type, Accept"
  );
  next();
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(bodyParser.json()); // Utilisation de bodyparser pour lire les corps requêtes en JSON
app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/auth", auth);
