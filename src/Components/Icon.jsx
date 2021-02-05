import React from "react";

/**
 * Composante déterminant un icône dans l'application
 * Permet d'afficher un icône avec font-awesome et de rajouter des champs utiles à la réutilisation
 * @param {bool} visible détermine si le logo est visible ou non
 * @param {string} className Classe CSS
 * @param {function} onClick fonction à éxécuter lors du click
 * @param {string} color Couleur CSS de l'icône
 * @param {*} otherProps Toutes autres propriétés
 */
export default function Icon({
  visible = true,
  className,
  onClick,
  color,
  ...otherProps
}) {
  return (
    visible && (
      <i
        className={className}
        onClick={onClick}
        style={{ color }}
        {...otherProps}
      />
    )
  );
}
