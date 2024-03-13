import React, { useState } from 'react';
import axios from 'axios'; // Assurez-vous qu'Axios est installé et importé correctement

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remplacez 'http://localhost:3001/api/register' par l'URL de votre API
      const response = await axios.post('http://localhost:3001/api/register', user);
      console.log('Réponse du serveur :', response.data);
      // Ajoutez ici la logique après une inscription réussie
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.response ? error.response.data : error);
      // Ajoutez ici la gestion des erreurs, comme afficher un message à l'utilisateur
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mot de passe</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
