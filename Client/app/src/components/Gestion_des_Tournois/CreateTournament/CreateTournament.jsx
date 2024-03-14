import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTournament() {
  const [tournamentData, setTournamentData] = useState({
    nom: '',
    jeu: '',
    nombreParticipants: '',
    type: 'public', // 'public' ou 'privé'
    lienTwitch: '',
    lienYoutube: '',
    reseaux: '',
    dateDebut: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournamentData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ajoutez la date de création ici si elle n'est pas automatiquement ajoutée par votre serveur
    const dateCreation = new Date().toISOString();
    const dataToSend = {
      ...tournamentData,
      dateCreation,
      // parQui: "ID ou nom de l'utilisateur connecté", // Cela devrait être géré côté serveur basé sur l'utilisateur authentifié
    };
    try {
      await axios.post('http://localhost:3001/api/tournaments', dataToSend);
      alert('Tournoi créé avec succès!');
      navigate('/tournaments');
    } catch (error) {
      console.error('Erreur lors de la création du tournoi:', error);
      alert('Erreur lors de la création du tournoi.');
    }
  };

  return (
    <div>
      <h2>Créer un nouveau tournoi</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du tournoi:</label>
          <input type="text" name="nom" value={tournamentData.nom} onChange={handleChange} required />
        </div>
        <div>
          <label>Nom du jeu:</label>
          <input type="text" name="jeu" value={tournamentData.jeu} onChange={handleChange} required />
        </div>
        <div>
          <label>Nombre de participants:</label>
          <input type="number" name="nombreParticipants" value={tournamentData.nombreParticipants} onChange={handleChange} required />
        </div>
        <div>
          <label>Type de tournoi:</label>
          <select name="type" value={tournamentData.type} onChange={handleChange} required>
            <option value="public">Public</option>
            <option value="privé">Privé</option>
          </select>
        </div>
        <div>
          <label>Lien Twitch (optionnel):</label>
          <input type="url" name="lienTwitch" value={tournamentData.lienTwitch} onChange={handleChange} />
        </div>
        <div>
          <label>Lien Youtube (optionnel):</label>
          <input type="url" name="lienYoutube" value={tournamentData.lienYoutube} onChange={handleChange} />
        </div>
        <div>
          <label>Réseaux (optionnel):</label>
          <input type="text" name="reseaux" value={tournamentData.reseaux} onChange={handleChange} />
        </div>
        <div>
          <label>Date du commencement du tournoi:</label>
          <input type="date" name="dateDebut" value={tournamentData.dateDebut} onChange={handleChange} required />
        </div>
        <button type="submit">Créer le tournoi</button>
      </form>
    </div>
  );
}

export default CreateTournament;

