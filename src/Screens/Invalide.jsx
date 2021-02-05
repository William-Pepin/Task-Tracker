import React from "react";

/**
 * Composante qui défini l'écran d'erreur 404
 */
export default function Invalide({ history }) {
  return (
    <div style={styles.page}>
      <div className="col-xl-6" style={styles.content}>
        <h1 style={styles.h1}>404</h1>
        <p>La page demandé est introuvable.</p>
        <button onClick={() => history.goBack()} className="btn btn-primary">
          Retour
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
  },
  h1: {
    fontSize: "12em",
  },
  content: {
    textAlign: "center",
    margin: "auto",
  },
};
