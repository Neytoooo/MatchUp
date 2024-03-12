const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'invvXmpe8',
  database: 'Lycorn',
  // Vous pouvez spécifier le port ici si nécessaire
});

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion : ' + err.stack);
    return;
  }

  console.log('Connecté à la base de données MySQL avec succès.');
});
