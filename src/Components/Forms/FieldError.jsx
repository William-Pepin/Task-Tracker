import React from "react";

/**
 * @Date 2020-02-10
 * @Author William Pépin
 * @Desc Composante définissant un message d'erreur lorsqu'un champ de formulaire est erroné.
 * @param {string} error Phrase à envoyer à l'utilisateur.
 * @param {boolean} visible Détermine si le message d'erreur est affiché ou non.
 * @returns Si visible, retourne un AppText avec le message d'erreur.
 */
export default function FormError({ error, visible }) {
  return error || visible ? <p className="text-warning">{error}</p> : null;
}
