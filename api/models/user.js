const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function User(_id, name, surname, email, password) {
  this._id = _id;
  this.name = name;
  this.surname = surname;
  this.email = email;
  this.password = password;

  this.generateAuthToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        name: this.name,
        surname: this.surname,
        email: this.email,
      },
      process.env.JWTPRIVATEKEY
    );
  };
  return this;
}

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    surname: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(125).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;
