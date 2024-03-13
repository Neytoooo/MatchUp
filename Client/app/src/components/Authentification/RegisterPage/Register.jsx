// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate depuis react-router-dom
import './Register.css';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Utiliser useNavigate pour obtenir la fonction de navigation

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
      await axios.post('http://localhost:3001/api/register', user);
      navigate('/login'); // Redirigez vers la page de connexion en cas de succès
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Cette adresse email est déjà utilisée par un autre compte.'); // Utilisez une méthode de notification plus sophistiquée dans une vraie application
      } else {
        console.error('Erreur lors de l\'inscription :', error);
      }
    }
  };
  

  return (
    <div className="register-container">
      <div className='title'>Register</div>
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
