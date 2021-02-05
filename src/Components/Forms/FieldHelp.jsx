import React from "react";

/**
 * @Desc Composante définissant un message d'aide sur un champ de formulaire.
 * @param {string} name Nom du champ rattaché
 * @param {string} help Description à affiché en dessous du formulaire
 * @returns Retourne un paragraphe avec le message d'aide stylisé avec Bootstrap.
 */
export default function FieldHelp({ helpFor: name, help }) {
  return help ? (
    <small id={`${name}Help`} className="form-text text-muted">
      {help}
    </small>
  ) : null;
}
