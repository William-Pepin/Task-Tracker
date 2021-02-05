import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { login } from "../Services/authService";

import Form from "../Components/Forms/Form";
import Field from "../Components/Forms/Field";
import SubmitButton from "../Components/Forms/SubmitButton";

/**
 * Composante qui défini l'écran de connexion
 */
export default function Connexion() {
  const initialValues = { email: "", password: "" };

  const onSubmit = async (values, actions) => {
    try {
      const { data: jwt } = await login(values.email, values.password);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        toast.error(e.response.data);
      }
      console.log(e);
    }
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(4).email().max(127).label("Courriel"),
    password: Yup.string().required().min(8).max(64).label("Mot de passe"),
  });

  return (
    <div style={styles.page}>
      <div className="card col-xl-5 col-md-8 col-11" style={styles.card}>
        <h3>Connexion</h3>
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
        <Link to="/inscription">S'inscrire</Link>
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
