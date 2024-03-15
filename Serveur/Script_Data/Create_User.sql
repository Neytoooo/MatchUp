CREATE TABLE IF NOT EXISTS Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expediteurId INT,
    destinataireId INT,
    contenu TEXT,
    dateEnvoi DATETIME,
    FOREIGN KEY (expediteurId) REFERENCES Utilisateurs(id),
    FOREIGN KEY (destinataireId) REFERENCES Utilisateurs(id)
);