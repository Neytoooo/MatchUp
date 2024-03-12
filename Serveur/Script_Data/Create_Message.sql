CREATE TABLE IF NOT EXISTS Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expéditeurId INT,
    destinataireId INT,
    contenu TEXT,
    dateEnvoi DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (expéditeurId) REFERENCES Utilisateurs(id),
    FOREIGN KEY (destinataireId) REFERENCES Utilisateurs(id)
);
