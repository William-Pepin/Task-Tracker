require("dotenv").config();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { validate, User } = require("../models/user");
const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * Route permettant d'enregister un utilisateur dans la base de données
 * Retourne un jeton d'authentification pour procéder dans l'application
 */
router.post("/", async (req, res) => {
  if (!req.body)
    return res.status(400).send("Body is empty or not a JSON format.");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);

  try {
    let result = await db.query("SELECT email FROM users where email = $1", [
      req.body.email,
    ]);
    if (result.rows.length === 1)
      return res.status(400).send("User already registered.");

    result = await db.query(
      "INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING _id;",
      [req.body.name, req.body.surname, req.body.email, hashed]
    );
    let user = new User(
      result.rows[0]._id,
      req.body.name,
      req.body.surname,
      req.body.email
    );

    const token = user.generateAuthToken();
    res.header("x-auth-token", token);
    res.header("access-control-expose-headers", "x-auth-token");
    return res.status(200).json({
      status: "ok",
      data: {
        user,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error.");
  }
});

module.exports = router;
