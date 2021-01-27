import { Route, Redirect, Switch } from "react-router-dom";

import Connexion from "./Screens/Connexion";
import Inscription from "./Screens/Inscription";
import TableauDeBord from "./Screens/TableauDeBord";
import Equipe from "./Screens/Equipe";
import Invalide from "./Screens/Invalide";

export default function App() {
  const connected = false; // todo
  return (
    <div className="App">
      <Switch>
        <Route path="/connexion" component={Connexion} />
        <Route path="/inscription" component={Inscription} />
        <Route path="/accueil" component={TableauDeBord} />
        <Route path="/equipes/:id" component={Equipe} />
        <Route path="/404" component={Invalide} />
        <Redirect path="/" exact to={connected ? "/accueil" : "/connexion"} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}
