const express = require('express');
const connection = require('./db'); // Assurez-vous que le chemin vers db.js est correct

const router = express.Router();

router.post('/api/tournaments', (req, res) => {
  const { nom, jeu, nombreParticipants, type, lienTwitch, lienYoutube, reseaux, dateDebut } = req.body;
  // ID utilisateur fictif pour l'exemple. Vous devriez utiliser l'ID de l'utilisateur connecté.
  const parQui = 1;
  const dateCreation = new Date();

  const insertQuery = `
    INSERT INTO Tournois (nom, jeu, nombreParticipants, type, parQui, lienTwitch, lienYoutube, reseaux, dateCreation, dateDebut)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(insertQuery, [nom, jeu, nombreParticipants, type, parQui, lienTwitch, lienYoutube, reseaux, dateCreation, dateDebut], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion du tournoi:', err);
      return res.status(500).send('Erreur lors de la création du tournoi');
    }
    res.status(201).send('Tournoi créé avec succès');
  });
});

router.get('/api/tournois', (req, res) => {
  const selectQuery = "SELECT * FROM Tournois";

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des tournois:', err);
      return res.status(500).send('Erreur lors de la récupération des tournois');
    }
    res.json(results);
  });
});

router.get('/api/tournois/:id', (req, res) => {
  const { id } = req.params;
  const selectQuery = "SELECT * FROM Tournois WHERE id = ?";

  connection.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des détails du tournoi:', err);
      return res.status(500).send('Erreur lors de la récupération des détails du tournoi');
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Tournoi non trouvé');
    }
  });
});

module.exports = router;
