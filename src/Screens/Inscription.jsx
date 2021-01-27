import React from "react";
import * as Yup from "yup";
import Form from "../Components/Forms/Form";
import Field from "../Components/Forms/Field";
import SubmitButton from "../Components/Forms/SubmitButton";

export default function Connexion() {
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const onSubmit = (values, actions) => {
    // TODO Faire le onSubmit call à l'API
    alert(JSON.stringify(values, null, 2));
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(4).email().max(127).label("Courriel"),
    password: Yup.string().required().min(8).max(64).label("Mot de passe"),
  });

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Field name="name" label="Prénom" placeholder="John" />
      <Field name="surname" label="Nom" placeholder="Doe" />
      <Field
        type="email"
        name="email"
        label={"Courriel"}
        placeholder="exemple@courriel.com"
      />
      <Field
        type="password"
        name="password"
        label={"Mot de passe"}
        placeholder="**************"
      />
      <Field
        type="password"
        name="confirmPassword"
        label={"Confirmez votre mot de passe"}
        placeholder="**************"
      />
      <SubmitButton title="Soumettre"></SubmitButton>
    </Form>
  );
}
