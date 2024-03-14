module.exports = function (io) {
    io.on('connection', (socket) => {
      console.log('Un utilisateur est connecté au chat');
  
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Envoie le message à tous les utilisateurs connectés
      });
  
      socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté du chat');
      });
    });
  };
  