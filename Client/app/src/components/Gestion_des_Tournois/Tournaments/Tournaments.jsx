import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Tournaments.css'; // Assurez-vous d'avoir ce fichier CSS pour le style des cards

function Tournaments() {
  const [tournois, setTournois] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournois = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tournois');
        setTournois(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tournois:', error);
      }
    };

    fetchTournois();
  }, []);

  const handleCreationClick = () => {
    navigate('/CreateTournament'); // Corrigez la casse pour correspondre à votre chemin défini
  };

  const handleCardClick = (id) => {
    navigate(`/tournaments/${id}`); // Navigue vers la page de détails du tournoi
  };

  return (
    <div>
      <h2>Tournois</h2>
      <div className="tournament-cards">
        {tournois.length > 0 ? (
          tournois.map(tournoi => (
            <div key={tournoi.id} className="tournament-card" onClick={() => handleCardClick(tournoi.id)}>
              <h3>{tournoi.nom}</h3>
              <p>Date: {tournoi.date}</p>
              {/* Autres détails du tournoi ici */}
            </div>
          ))
        ) : (
          <p>Pas de tournois disponible.</p>
        )}
      </div>
      <button onClick={handleCreationClick}>Créer un Tournoi</button>
    </div>
  );
}

export default Tournaments;
