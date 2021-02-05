import http from "./httpService";
import { apiUrl } from "../Config/config.json";
const apiEndpoint = apiUrl + "/tasks";

/**
 * Fonction permettant d'effectuer une requête à l'API permettant d'aller 
 * chercher toutes les tâches.
 */
export function get() {
  return http.get(apiEndpoint);
}

/**
 * Fonction permettant d'effectuer une requête à l'API permettant d'aller 
 * supprimer une tâche.
 * @param {int} _id identifiant unique de la tâche à supprimer 
 */
export function del(_id) {
  return http.delete(`${apiEndpoint}/${_id}`);
}

/**
 * Foncstion permettant d'effectuer une requête à l'API permettant d'aller
 * ajouter une tâche.
 * @param {Object} task  tâche à rajouter
 */
export function post(task) {
  return http.post(apiEndpoint, {
    title: task.title,
    description: task.description,
    flagged: task.flagged,
    priority: task.priority,
    completed: task.completed,
  });
}

/**
 * Foncstion permettant d'effectuer une requête à l'API permettant d'aller
 * modifier une tâche.
 * @param {Object} task  tâche à modifier
 */
export function update(task) {
  return http.put(`${apiEndpoint}/${task._id}`, {
    title: task.title,
    description: task.description,
    flagged: task.flagged,
    priority: task.priority,
    completed: task.completed,
  });
}
