import React, { useState } from "react";

import Icon from "./Icon";

export default function Task({
  task,
  onFlag,
  onPriority,
  onDelete,
  onComplete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <tr
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => setIsHover(false)}
    >
      <td>
        <input
          type="checkbox"
          className="form-check-input"
          checked={task.completed}
          onChange={() => onComplete(task)}
        />
      </td>
      <td>
        {isOpen && (
          <input
            type="checkbox"
            className="form-check-input"
            checked={task.priority}
            onChange={() => onPriority(task)}
          />
        )}

        {(task.priority || isOpen) && (
          <span className="text-danger font-weight-bold">Prioritaire</span>
        )}
        <p>{task.title}</p>
        {isOpen && <p>{task.description}</p>}
      </td>
      <td>
        <Icon
          visible={!task.isFlagged && isOpen}
          onClick={() => onFlag(task)}
          className="fa fa-flag-o"
        />
        <Icon
          visible={task.isFlagged}
          onClick={() => onFlag(task)}
          className="fa fa-flag"
        ></Icon>
      </td>
      <td>
        <Icon
          visible={isHover}
          className="fa fa-ellipsis-h"
          onClick={() => setIsOpen(!isOpen)}
        />
      </td>
      <td>
        <Icon
          visible={isOpen}
          color={"#dc3545"}
          className="fa fa-trash"
          onClick={() => onDelete(task)}
        />
      </td>
    </tr>
  );
}
