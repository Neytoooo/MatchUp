CREATE TABLE IF NOT EXISTS RangsUtilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateurId INT,
    jeuId INT,
    rang VARCHAR(255),
    FOREIGN KEY (utilisateurId) REFERENCES Utilisateurs(id),
    FOREIGN KEY (jeuId) REFERENCES Jeux(id)
);
