// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', credentials);
if (response.data.message === 'Connexion réussie') {
  localStorage.setItem('user', JSON.stringify(response.data.user));
  localStorage.setItem('isLoggedIn', 'true');
  navigate('/home');
} else {
  setError('Adresse email ou mot de passe incorrect.');
}

    } catch (error) {
      if (error.response) {
        // Le serveur a répondu avec un statut d'erreur
        setError(error.response.data.message);
      } else {
        // Une erreur s'est produite dans la mise en place de la requête
        setError('Une erreur est survenue lors de la connexion.');
      }
      console.error('Erreur lors de la connexion :', error);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
