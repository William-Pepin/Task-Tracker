import React from "react";
import { Link } from "react-router-dom";
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
    email: Yup.string().required().min(4).email().max(128).label("Courriel"),
    password: Yup.string().required().min(8).max(64).label("Mot de passe"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Doit être identique au mot de passe."
    ),
    name: Yup.string().required().min(2).max(64).label("Prénom"),
    surname: Yup.string().required().min(2).max(64).label("Nom"),
  });

  return (
    <div style={styles.page}>
      <div className="card col-xl-4 col-md-8 col-sm-10" style={styles.card}>
        <h3>Inscription</h3>
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
          <SubmitButton title="S'inscrire"></SubmitButton>
        </Form>
        <Link to="/connexion">Se connecter ?</Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: "2rem",
    margin: "auto",
  },
  page: {
    height: "100vh",
    display: "flex",
  },
};
