CREATE TABLE IF NOT EXISTS RechercheMates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateurId INT,
    jeuId INT,
    description TEXT,
    dateRecherche DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateurId) REFERENCES Utilisateurs(id),
    FOREIGN KEY (jeuId) REFERENCES Jeux(id)
);
