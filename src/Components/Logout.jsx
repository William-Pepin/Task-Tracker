import { Component } from "react";

/**
 * Page de déconnexion, utilisé pour supprimer le jeton d'authentification
 * et pour être utiliser comme page de transition afin de permettre au composante React de "unmount"
 */
export default class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/";
  }
  render() {
    return null;
  }
}
