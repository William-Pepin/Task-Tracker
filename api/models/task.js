const Joi = require("joi");

/**
 * Constructeur fonctionnel d'un utilisateur
 * Permet d'instancier un nouvel utilisateur
 * @param {int} user_id identifiant unique de l'utilisateur rattaché à la tâche
 * @param {string} title Titre de la tâche
 * @param {string} description Description de la tâche
 * @param {bool} flagged Indique si la tâche à un drapeau
 * @param {bool} priority Indique si la tâche est prioritaire
 * @param {bool} completed Indique si la tâche est complété
 */
function Task(
  user_id,
  title,
  description = "",
  flagged = false,
  priority = false,
  completed = false
) {
  return {
    user_id,
    title,
    description,
    flagged,
    priority,
    completed,
  };
}
/**
 * Fonction utilisé pour valider les champs d'une tâche.
 * Utilise le paquet Joi pour effectuer la validation de l'objet.
 * Se référer à la documentation de Joi pour plus d'informations sur les validations.
 * @param {*} task Tâche à valider 
 */
function validateTask(task) {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    title: Joi.string().min(2).max(125).required(),
    description: Joi.string().allow("").max(255),
    flagged: Joi.bool().required(),
    priority: Joi.bool().required(),
    completed: Joi.bool().required(),
  });
  return schema.validate(task);
}
exports.Task = Task;
exports.validate = validateTask;
