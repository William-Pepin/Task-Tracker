import React from "react";
import Task from "./Task";

/**
 * Composante permettant d'afficher un tableau de tâches
 * @param {Object} task tâche à afficher
 * @param {function} onFlag Fonction à utiliser lorsque l'objet est "flagged".
 * @param {function} onPriority Fonction à utiliser lorsque la priorité change.
 * @param {function} onDelete Fonction à utiliser lorsque la tâche est supprimé.
 * @param {function} onComplete Fonction à utiliser lorsque la tâche est
 */
export default function Tasks({
  tasks,
  onFlag,
  onPriority,
  onDelete,
  onComplete,
}) {
  return (
    <table className="table">
      <tbody>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onFlag={onFlag}
            onPriority={onPriority}
            onComplete={onComplete}
            onDelete={onDelete}
          ></Task>
        ))}
      </tbody>
    </table>
  );
}
