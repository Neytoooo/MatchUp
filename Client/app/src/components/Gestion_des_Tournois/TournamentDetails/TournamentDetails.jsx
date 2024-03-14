import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TournamentDetails() {
  const [tournoi, setTournoi] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTournoiDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/tournois/${id}`);
        setTournoi(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du tournoi:', error);
      }
    };

    fetchTournoiDetails();
  }, [id]);

  if (!tournoi) {
    return <div>Chargement des détails du tournoi...</div>;
  }

  return (
    <div>
      <h2>Détails du Tournoi: {tournoi.nom}</h2>
      <p>Jeu: {tournoi.jeu}</p>
      <p>Nombre de Participants: {tournoi.nombreParticipants}</p>
      {/* Affichez d'autres détails du tournoi ici */}
    </div>
  );
}

export default TournamentDetails;

