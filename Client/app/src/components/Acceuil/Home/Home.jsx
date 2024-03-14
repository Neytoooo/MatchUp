import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from "../../Recherche_et_Communication/Chat/Chat";


function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h1>Page d'accueil</h1>
      <Chat /> {/* Intégration du composant Chat */}
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}

export default Home;
