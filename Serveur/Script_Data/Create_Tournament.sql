CREATE TABLE Tournois (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  jeu VARCHAR(255) NOT NULL,
  nombreParticipants INT NOT NULL,
  type ENUM('public', 'prive') NOT NULL,
  parQui INT NOT NULL,
  lienTwitch VARCHAR(255),
  lienYoutube VARCHAR(255),
  reseaux VARCHAR(255),
  dateCreation DATETIME NOT NULL,
  dateDebut DATETIME NOT NULL,
  FOREIGN KEY (parQui) REFERENCES Utilisateurs(id)
);