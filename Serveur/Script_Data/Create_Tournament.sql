CREATE TABLE IF NOT EXISTS Tournois (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    jeuId INT,
    typeTournoi ENUM('Public', 'Privé') NOT NULL,
    cashPrice DECIMAL(10, 2),
    dateDebut DATETIME,
    dateFin DATETIME,
    FOREIGN KEY (jeuId) REFERENCES Jeux(id)
);
