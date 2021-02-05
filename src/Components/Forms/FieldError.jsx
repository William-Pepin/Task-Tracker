import React from "react";

/**
 * @Desc Composante définissant un message d'erreur lorsqu'un champ de formulaire est erroné.
 * @param {string} error Phrase à envoyer à l'utilisateur.
 * @param {boolean} visible Détermine si le message d'erreur est affiché ou non.
 * @returns Si visible, retourne un paragraphe avec le message d'erreur.
 */
export default function FormError({ error, visible }) {
  return error || visible ? <p className="text-warning">{error}</p> : null;
}
