const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();


/**
 * Constructeur fonctionnel permettant d'instancier un nouvel utilisateur.
 * @param {*} _id Identifiant unique de l'utilisateur
 * @param {*} name Prénom de l'utilisateur
 * @param {*} surname Nom de l'utilisateur
 * @param {*} email Courriel de l'utilisateur, doit être unique
 * @param {*} password Mot de passe de l'utilisateur
 */
function User(_id, name, surname, email, password) {
  this._id = _id;
  this.name = name;
  this.surname = surname;
  this.email = email;
  this.password = password;

  // Permet d'avoir la fonction qui génère un jeton JSON
  // dans l'objet de l'utilisateur
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
/**
 * Fonction permettant de valider un utilisateur
 * Utilise le paquet Joi pour effectuer la validation de l'objet.
 * Se référer à la documentation de Joi pour plus d'informations sur les validations.
 * @param {*} user Utilisateur à valider 
 */
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
