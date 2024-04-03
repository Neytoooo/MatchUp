// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

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
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Cette adresse email est déjà utilisée par un autre compte.');
      } else {
        console.error('Erreur lors de l\'inscription :', error);
      }
    }
  };

  return (
    <div className="container">
      <div className='title'>Register</div>
      <div className="form_area">
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label>Nom</label>
            <input className="form_style" type="text" name="name" value={user.name} onChange={handleChange} required placeholder="Entrez votre nom" />
          </div>
          <div className="form_group">
            <label>Email</label>
            <input className="form_style" type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Entrez votre email" />
          </div>
          <div className="form_group">
            <label>Mot de passe</label>
            <input className="form_style" type="password" name="password" value={user.password} onChange={handleChange} required placeholder="Entrez votre mot de passe" />
          </div>
          <button className="btn" type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
