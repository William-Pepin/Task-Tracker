import React from "react";
import * as Yup from "yup";

import Form from "../Components/Forms/Form";
import Field from "../Components/Forms/Field";
import SubmitButton from "../Components/Forms/SubmitButton";

/**
 * Composante fonctionnelle permettant d'afficher le formulaire pour mettre à jour les informations de l'utilisateur
 * @param {Object} user utilisateur à modifier dans le formulaire
 *
 */
export default function Connexion({ user }) {
  const initialValues = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const onSubmit = (values, actions) => {
    // TODO Faire le onSubmit call à l'API
    alert(JSON.stringify(values, null, 2));
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(4).email().max(128).label("Courriel"),
    password: Yup.string()
      .required()
      .min(8)
      .max(64)
      .label("Nouveau mot de passe"),
    oldPassword: Yup.string().required().label("Ancien mot de passe"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Doit être identique au mot de passe."
    ),
    name: Yup.string().required().min(2).max(64).label("Prénom"),
    surname: Yup.string().required().min(2).max(64).label("Nom"),
  });

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Field name="name" label="Prénom" />
      <Field name="surname" label="Nom" />
      <Field
        type="email"
        name="email"
        label={"Courriel"}
        placeholder="exemple@courriel.com"
      />
      <Field
        type="password"
        name="oldPassword"
        label={"Ancien mot de passe"}
        placeholder="**************"
      />
      <Field
        type="password"
        name="newPassword"
        label={"Nouveau mot de passe"}
        placeholder="**************"
      />
      <Field
        type="password"
        name="confirmPassword"
        label={"Confirmez votre nouveau mot de passe"}
        placeholder="**************"
      />
      <SubmitButton title="Enregistrer" />
    </Form>
  );
}
