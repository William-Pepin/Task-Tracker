require("dotenv").config();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const db = require("../db");
const { User } = require("../models/user");

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

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(125).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;
