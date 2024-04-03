import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

// Assurez-vous que l'adresse correspond à l'URL de votre serveur
const socket = io('http://localhost:3001'); 

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("État actuel des messages :", messages);
    const handleNewMessage = (msg) => {
      console.log("Message reçu :", msg); // Log pour vérifier le message reçu
      setMessages((messages) => [...messages, msg]);
    };
  
    socket.on('chat message', handleNewMessage);
  
    return () => {
      socket.off('chat message', handleNewMessage);
    };
  }, []);
  
  

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Envoi du message :", message); 
      socket.emit('chat message', message);
      setMessage('');
    }
  };
  

  return (
    <div className='Container-Chat'>
      <h2>Chat en Direct</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez un message..."
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Chat;
