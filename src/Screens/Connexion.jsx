import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import Form from "../Components/Forms/Form";
import Field from "../Components/Forms/Field";
import SubmitButton from "../Components/Forms/SubmitButton";

export default function Connexion() {
  const initialValues = { email: "", password: "" };
  const onSubmit = (values, actions) => {
    // TODO Faire le onSubmit call à l'API
    alert(JSON.stringify(values, null, 2));
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(4).email().max(127).label("Courriel"),
    password: Yup.string().required().min(8).max(64).label("Mot de passe"),
  });

  return (
    <div className="card col-xl-4 col-md-8 col-sm-10" style={styles.card}>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Field
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
        <SubmitButton title="Se connecter"></SubmitButton>
      </Form>
      <Link style={styles.link} to="/inscription">
        S'inscrire
      </Link>
    </div>
  );
}

const styles = {
  card: {
    padding: "2rem",
    margin: "25vh auto",
  },
  link: {
    paddingLeft: "14px",
  },
};
