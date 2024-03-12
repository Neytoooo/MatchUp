import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/Acceuil/Home/Home';
import Login from './components/Authentification/LoginPage/Login';
import Register from './components/Authentification/RegisterPage/Register';
import UserProfile from './components/Authentification/UserProfile/Profile';
import Tournaments from './components/Gestion_des_Tournois/Tournaments/Tournaments';
import TournamentDetails from './components/Gestion_des_Tournois/TournamentDetails/TournamentDetails';
// import NotFound from './components/NotFound';

// Un hook fictif pour déterminer si l'utilisateur est connecté
// Vous devrez le remplacer par votre propre logique d'authentification.
function useAuth() {
  const user = { loggedIn: false }; // Exemple d'état d'utilisateur
  return user && user.loggedIn;
}

function App() {
  const isAuth = useAuth();

  return (
    <Router>
      <div>
        <Switch>
          {/* Redirige les utilisateurs non authentifiés vers la page Register */}
          <Route exact path="/">
            {isAuth ? <Home /> : <Redirect to="/register" />}
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* Protège les routes nécessitant une authentification */}
          <Route path="/user-profile">
            {isAuth ? <UserProfile /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/tournaments">
            {isAuth ? <Tournaments /> : <Redirect to="/login" />}
          </Route>
          <Route path="/tournaments/:id">
            {isAuth ? <TournamentDetails /> : <Redirect to="/login" />}
          </Route>
          {/* Ajoutez d'autres routes ici au besoin */}
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
