const Joi = require("joi");

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
