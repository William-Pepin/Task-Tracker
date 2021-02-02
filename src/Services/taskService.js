import http from "./httpService";
import { apiUrl } from "../Config/config.json";
const apiEndpoint = apiUrl + "/tasks";

export function get() {
  return http.get(apiEndpoint);
}
export function del(_id) {
  return http.delete(`${apiEndpoint}/${_id}`);
}

export function post(task) {
  return http.post(apiEndpoint, {
    title: task.title,
    description: task.description,
    flagged: task.flagged,
    priority: task.priority,
    completed: task.completed,
  });
}

export function update(task) {
  return http.put(`${apiEndpoint}/${task._id}`, {
    title: task.title,
    description: task.description,
    flagged: task.flagged,
    priority: task.priority,
    completed: task.completed,
  });
}
