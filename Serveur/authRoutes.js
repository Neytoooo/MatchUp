const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const connection = require('./db'); // Assurez-vous que le chemin vers db.js est correct
const app = express();
const router = express.Router();

// Route pour l'inscription
router.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  const checkEmailQuery = "SELECT email FROM Utilisateurs WHERE email = ?";
  
  connection.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).send('Erreur lors de la vérification de l\'email');
    }
    
    if (results.length > 0) {
      return res.status(409).send('Cette adresse email est déjà utilisée par un autre compte.');
    } else {
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

// Route pour la connexion
router.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM Utilisateurs WHERE email = ?";

  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l’utilisateur', err);
      return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }

    if (results.length === 0) {
      console.log('Aucun utilisateur trouvé avec cet email');
      return res.status(401).json({ message: 'Adresse email ou mot de passe incorrect' });
    }

    const user = results[0];

    try {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        console.log('Utilisateur connecté:', user);
        res.json({ message: 'Connexion réussie', user: { id: user.id, name: user.name, email: user.email } });
      } else {
        console.log('Mot de passe incorrect');
        res.status(401).json({ message: 'Adresse email ou mot de passe incorrect' });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du mot de passe', error);
      res.status(500).json({ message: 'Erreur lors de la vérification du mot de passe' });
    }
  });
});

router.get('/api/profile', (req, res) => {
  // Ici, l'exemple utilise une ID fictive car req.user.id n'est pas défini dans votre exemple.
  // Vous devez mettre en place une authentification et attribuer req.user.id selon votre logique d'authentification.
  const userId = 1; // Cet ID doit provenir de votre système d'authentification ou de votre logique d'application.

  const query = 'SELECT name, email FROM utilisateurs WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).send('Erreur de serveur');
      }
      if (results.length > 0) {
          res.json(results[0]);
      } else {
          res.status(404).send('Utilisateur non trouvé');
      }
  });
});


module.exports = router;
