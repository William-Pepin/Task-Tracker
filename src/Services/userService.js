import http from "./httpService";
import { apiUrl } from "../Config/config.json";
const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
  });
}
