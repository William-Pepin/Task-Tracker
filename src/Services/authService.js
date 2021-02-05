import http from "./httpService";

import { apiUrl } from "../Config/config.json";

const apiEndpoint = apiUrl + "/auth";

/**
 * Fonction permettant de faire une requête d'authentification à l'API
 * @param {String} email courriel de l'utilisateur
 * @param {String} password courriel de l'utilisateur
 */
export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}
