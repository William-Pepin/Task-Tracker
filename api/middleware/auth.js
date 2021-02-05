require("dotenv").config();
const jwt = require("jsonwebtoken");


/**
 * Fonction utilisé comme Middleware Espress, utilisé pour authentifier un utilisateur de l'application à l'aide de son JSON WEB TOKEN. le JsonWebToken est dans le header "x-auth-token". Décode le jeton et l'utilise pour accéder à l'usager. Les paramètres 
 * @param {*} req requête http de l'usager
 * @param {*} res réponse de l'api
 * @param {*} next prochaine fonction à exécuter suite à l'authentification 
 */
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
