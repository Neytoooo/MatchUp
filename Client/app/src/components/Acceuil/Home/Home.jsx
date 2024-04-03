import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from "../../Recherche_et_Communication/Chat/Chat";
import './Home.css';
function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className='Container-page'>
      <div className='Title'><h1>TeamUp</h1></div>
      
      <div className='Chat'><Chat /> </div>
    </div>
  );
}

export default Home;
