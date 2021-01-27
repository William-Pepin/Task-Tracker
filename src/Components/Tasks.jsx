import React from "react";
import Task from "./Task";

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
