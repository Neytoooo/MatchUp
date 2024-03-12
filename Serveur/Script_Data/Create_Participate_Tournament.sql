CREATE TABLE IF NOT EXISTS ParticipationsTournoi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tournoiId INT,
    utilisateurId INT,
    rangFinal INT,
    FOREIGN KEY (tournoiId) REFERENCES Tournois(id),
    FOREIGN KEY (utilisateurId) REFERENCES Utilisateurs(id)
);
