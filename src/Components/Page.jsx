import React from "react";
import * as Yup from "yup";
import Form from "./Forms/Form";
import Field from "./Forms/Field";
import SubmitButton from "./Forms/SubmitButton";

export default function Page() {
  const initialValues = { email: "", password: "" };
  const onSubmit = (values, actions) => {
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
      <Field
        name="email"
        label={"Courriel"}
        help="Entrez votre courriel."
        placeholder="exemple@courriel.com"
      />
      <Field
        type="password"
        name="password"
        label={"Mot de passe"}
        help="Entrez votre mot de passe."
        placeholder="**************"
      />
      <SubmitButton title="Submit"></SubmitButton>
    </Form>
  );
}
