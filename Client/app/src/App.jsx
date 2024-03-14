import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Acceuil/Home/Home.jsx';
import Header from './components/Header/Header.jsx';
import Login from './components/Authentification/LoginPage/Login';
import Register from './components/Authentification/RegisterPage/Register';
import UserProfile from './components/Authentification/UserProfile/Profile';
import Tournaments from './components/Gestion_des_Tournois/Tournaments/Tournaments';
import CreateTournament from './components/Gestion_des_Tournois/CreateTournament/CreateTournament';

import TournamentDetails from './components/Gestion_des_Tournois/TournamentDetails/TournamentDetails';
import NotFound from './components/NotFound';

function useAuth() {
  const user = localStorage.getItem('user');
  return user != null; 
}


function App() {
  const isAuth = useAuth();

  return (
    <Router>
      
      <div>
      <Header />  
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Navigate replace to="/register" />} />
          <Route path="/home" element={isAuth ? <Home /> : <Navigate replace to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-profile" element={isAuth ? <UserProfile /> : <Navigate replace to="/login" />} />
          <Route exact path="/tournaments" element={isAuth ? <Tournaments /> : <Navigate replace to="/login" />} />
          <Route path="/CreateTournament" element={isAuth ? <CreateTournament /> : <Navigate replace to="/login" />} />
          <Route path="/tournaments/:id" element={isAuth ? <TournamentDetails /> : <Navigate replace to="/login" />} />
          <Route path="/tournaments/:id" element={<TournamentDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
