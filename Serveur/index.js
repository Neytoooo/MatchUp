const http = require('http');
const socketIo = require('socket.io');
const app = require('./app'); // Assurez-vous que le chemin est correct
const setupChat = require('./chatSocket'); // Vérifiez le chemin
const authRoutes = require('./authRoutes'); // Vérifiez le chemin
const tournamentRoutes = require('./tournamentRoutes'); // Vérifiez le chemin

// Création du serveur HTTP à partir de l'app Express
const server = http.createServer(app);

// Initialisation de socket.io avec le serveur HTTP
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

// Utilisation des routeurs
app.use(authRoutes);
app.use(tournamentRoutes);

// Configuration de Socket.io pour le chat
setupChat(io);

const port = 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
