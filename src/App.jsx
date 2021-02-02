import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import Connexion from "./Screens/Connexion";
import Inscription from "./Screens/Inscription";
import TableauDeBord from "./Screens/TableauDeBord";
import Invalide from "./Screens/Invalide";
import Logout from "./Components/Logout";

export default class App extends React.Component {
  state = {
    user: () => {
      jwtDecode(localStorage.getItem("token"));
    },
  };
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (e) {}
  }
  render() {
    const connected = localStorage.getItem("token");
    return (
      <div className="App">
        <ToastContainer />
        <Switch>
          <Route path="/connexion" component={Connexion} />
          <Route path="/inscription" component={Inscription} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/accueil"
            component={() => <TableauDeBord user={this.state.user} />}
          />
          <Route path="/404" component={Invalide} />
          <Redirect path="/" exact to={connected ? "/accueil" : "/connexion"} />
          <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}
