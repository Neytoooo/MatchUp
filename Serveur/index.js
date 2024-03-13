const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors()); // Activez CORS pour toutes les requêtes


// Votre configuration de connexion MySQL existante
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'invvXmpe8',
  database: 'Lycorn',
  // Spécifiez le port ici si nécessaire
});

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion : ' + err.stack);
    return;
  }

  console.log('Connecté à la base de données MySQL avec succès.');
});

// Middleware pour parser le body des requêtes en JSON
app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Hashage du mot de passe avant de l'insérer dans la base de données
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      return res.status(500).send('Erreur lors du hashage du mot de passe');
    }
    
    // La requête SQL pourrait varier en fonction de la structure de votre table d'utilisateurs
    const query = "INSERT INTO Utilisateurs (name, email, password) VALUES (?, ?, ?)";
    
    connection.query(query, [name, email, hash], (err, result) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).send('Utilisateur enregistré avec succès');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
