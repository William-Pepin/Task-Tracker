import React from "react";
import { Formik } from "formik";

/**
 * Retourne le "wrapper" pour un formulaire formik avec les paramètres de base
 * Permet de réduire à l'essentiel l'utilisation de Formik et d'enlever  l'utilisation de la syntaxe étrange de Formik.
 *
 * @param {JSX} children Enfant du composant
 * @param {Object} initialValues valeur initiale des champ du formulaire
 * @param {Function} onSubmit fonction à éxécuter lors de la soumission du formulaire
 * @param {Yup.Object.Shape} validationSchema Schéma de validatiob Yup permettant d'effectuer la validation du formulaire.
 */
export default function Form({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      {(props) => <form onSubmit={props.handleSubmit}>{children}</form>}
    </Formik>
  );
}
