import React from "react";

export default function SubmitButton({ title }) {
  return (
    <button type="submit" className="btn btn-primary">
      {title}
    </button>
  );
}
