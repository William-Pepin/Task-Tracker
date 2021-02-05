import http from "./httpService";
import { apiUrl } from "../Config/config.json";
const apiEndpoint = apiUrl + "/users";

/**
 * Fonction permettant d'effectuer une requête à l'api permettant
 * d'enregistrer un utilisateur
 * @param {Object} user utilisateur à rajouter
 */
export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
  });
}
