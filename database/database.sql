CREATE DATABASE ng_games_db;

USE ng_games_db;

CREATE TABLE game(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(180),
    description VARCHAR(255),
    image VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

RENAME TABLE game to game;

DESCRIBE game;

CREATE TABLE user(
    idUser INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(180),
    email VARCHAR(180),
    password VARCHAR(255)
);

DESCRIBE user;