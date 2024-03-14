// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assurez-vous de créer ce fichier CSS pour styliser votre en-tête

const Header = () => {
  return (
    <header className="header">
      <h1>MatchUp</h1>
      <nav>
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/tournaments">Tournois</Link></li>
          <li><Link to="/teamup">TeamUp</Link></li>
        </ul>
      </nav>
      <div className="profile-pic">
        <img src="C:\Users\Administrateur\Test\Client\app\public\profile.png" alt="Profile" />
      </div>
    </header>
  );
};

export default Header;
