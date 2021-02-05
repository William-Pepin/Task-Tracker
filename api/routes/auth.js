require("dotenv").config();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const db = require("../db");
const { User } = require("../models/user");


/**
 * Route permettant d'authentifier un utilisateur dans l'application
 * Utilise la route /auth pour valider les informations de l'utilisateur.
 * Valide si l'utilisateur est dans la base de données, si il est présent, il
 * utilise le paquet bcrypt pour "hash" le mot de passe et le comparer à celui * dans la base de données.
 */
router.post("/", async (req, res) => {
  if (!req.body)
    return res.status(400).send("Body is empty or not a JSON format.");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let result = await db.query(
      "SELECT _id, email, name, surname, password FROM users where email = $1",
      [req.body.email]
    );
    if (result.rows.length === 0)
      return res.status(400).send("Invalid email or password.");

    const user = new User(
      result.rows[0]._id,
      result.rows[0].name,
      result.rows[0].surname,
      result.rows[0].email,
      result.rows[0].password
    );

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();

    res.send(token);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error.");
  }
});

/**
 * Fonction permettant de valider si le courriel et le mot de passe.
 * Utilise le paquet Joi pour effectuer la validation.
 * @param {*} body corps de la requête
 */
function validate(body) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(125).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(body);
}

module.exports = router;
