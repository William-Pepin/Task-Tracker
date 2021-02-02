import http from "./httpService";

import { apiUrl } from "../Config/config.json";

const apiEndpoint = apiUrl + "/auth";

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}
