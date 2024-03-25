import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; 

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/api/profile')
      .then(response => {
        
        setProfile(response.data);
      })
      .catch(error => {l
        console.error('Il y a eu une erreur de récupération des données du profil', error);
      });
  }, []);

  
// Le reste de votre composant reste inchangé...

return (
 <div className='Container'>
  <div className='Left'>
       <div className='Account'><div className="profile-pic">
        <img src="C:\Users\Administrateur\Test\Client\app\public\profile.png" alt="Profile" />
      </div>
      <h1>Account</h1>
       <div> Name: Mattis</div>
       <div> Email : mattiskhn@gmail.com</div>
        <div>Epic Game : Neyto.</div>
        <div>Steam : Neyto.</div>
       <div></div></div>
       
  </div>
  
  <div className='Right'>
      <div className='Infos-Profil'><h1>A propos de Moi</h1>
      <p>Je suis un mec incroyable qui fais des Live sur twitch et Youtube j'organise des tournois environ tout les dimanches sur Valorant, si tu as envie de me suivre viens sur mes reseaux en bio sur ma page</p></div>
  <div className='Boite'>
      <div className='Connexion'><h1>Connexion</h1>
      <p>Youtube</p>
      <p>Twitch</p>
      <p>Spootify</p>
      <p>Snapchat</p>
      </div>
      <div className='Amis'>
        <h1>L'iste d'amis</h1>
        <p>Mathieu</p>
        <p>Mathieu</p>
        <p>Mathieu</p>
        <p>Mathieu</p>
      </div>
  </div>
  </div>
 </div>
);
}
export default Profile;
