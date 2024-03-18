import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // N'oubliez pas d'importer votre fichier CSS

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/api/profile')
      .then(response => {
        // Assurez-vous que la réponse correspond à la structure de vos données
        setProfile(response.data);
      })
      .catch(error => {l
        console.error('Il y a eu une erreur de récupération des données du profil', error);
      });
  }, []);

  // Utilisez 'profile' pour accéder aux données de l'utilisateur
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {/* Ici, vous pouvez ajouter l'image de l'utilisateur */}
        </div>
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
        </div>
        
      </div>
      <div className='infos'>a propos de moi</div>
      <div className='boite'>
        <div className='connexion'>connexion</div>
        <div className='Liste_friends'>Liste d'amis</div>
        </div>
    </div>
  );
};

export default Profile;
