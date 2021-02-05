import React from "react";
import { useFormikContext } from "formik"; // Contexte du formulaire

import Help from "./FieldHelp";
import Error from "./FieldError";

/**
 * @Desc Composante définissant un champ de texte dans un formulaire formik.
 * @param {string} name Nom du champ du formulaire
 * @param otherProps Toutes autres propriétés s'appliquant au TextInput de React-Native.
 * @param label Le libellé du champ, si déclaré, affiche un libellé au dessus du champ.
 * @param help L'aide du champ, si déclaré, affiche une message d'aide en dessous du champ.
 * @param placeholder Permet d'ajouter un message à l'intérieur du champ
 * @param description La description détaillé du champ, si elle est déclaré, elle affiche un icône d'informations avec la description lors du clic.
 * @returns Un champ de formulaire bootstrap fonctionnant dans un contexte de formulaire Formik.
 */
export default function Field({
  name,
  label,
  help,
  placeholder,
  ...otherProps
}) {
  const {
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
  } = useFormikContext();
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        onBlur={handleBlur}
        className="form-control"
        id={name}
        name={name}
        onChange={handleChange}
        value={values[name]}
        placeholder={placeholder}
        {...otherProps}
      />
      <Help helpfor={name} help={help} />
      <Error error={errors[name]} visible={touched[name]} />
    </div>
  );
}
