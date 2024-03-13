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
  
  // Vérifiez d'abord si l'email existe déjà
  const checkEmailQuery = "SELECT email FROM Utilisateurs WHERE email = ?";
  
  connection.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).send('Erreur lors de la vérification de l\'email');
    }
    
    if (results.length > 0) {
      // Si l'email existe déjà, renvoyez une erreur
      return res.status(409).send('Cette adresse email est déjà utilisée par un autre compte.');
    } else {
      // Si l'email n'existe pas, procédez à l'inscription
      // Hashage du mot de passe avant de l'insérer dans la base de données
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const insertQuery = "INSERT INTO Utilisateurs (name, email, password) VALUES (?, ?, ?)";
        
        connection.query(insertQuery, [name, email, hashedPassword], (err, result) => {
          if (err) {
            return res.status(500).send('Erreur lors de l\'inscription');
          }
          res.status(200).send('Utilisateur enregistré avec succès');
        });
      } catch (error) {
        res.status(500).send('Erreur lors du hashage du mot de passe');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
