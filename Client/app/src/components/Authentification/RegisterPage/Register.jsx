const mysql = require('mysql2/promise');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'utilisateur',
  password: 'motdepasse',
  database: 'nom_de_ta_base_de_donnees'
});

// Assure-toi que ta base de données est correctement connectée avant d'utiliser ce composant

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Connexion à la base de données
      await connection.connect();
      // Requête pour insérer un nouvel utilisateur dans la table Utilisateurs
      await connection.query(
        'INSERT INTO Utilisateurs (nom_utilisateur, email, mot_de_passe) VALUES (?, ?, ?)',
        [userData.username, userData.email, userData.password]
      );
      console.log('Utilisateur enregistré avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    } finally {
      // Ferme la connexion à la base de données
      await connection.end();
    }
  };

  return (
    <div className="register-container">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="username">Nom d'utilisateur:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="register-btn">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
