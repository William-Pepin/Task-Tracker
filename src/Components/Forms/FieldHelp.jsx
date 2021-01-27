import React from "react";

export default function FieldHelp({ helpFor: name, help }) {
  return help ? (
    <small id={`${name}Help`} className="form-text text-muted">
      {help}
    </small>
  ) : null;
}
