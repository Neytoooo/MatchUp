const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'invvXmpe8',
  database: 'Lycorn',
});

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL: ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL avec succès.');
});

module.exports = connection;
