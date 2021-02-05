import React from "react";

/**
 * Composante permettant de définir un bouton dans un formulaire
 * @param {string} title titre du bouton affiché à l'intérieur de celui-ci.
 */
export default function SubmitButton({ title }) {
  return (
    <button type="submit" className="btn btn-primary">
      {title}
    </button>
  );
}
