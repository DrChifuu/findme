-- Base de datos y tabla principal
CREATE DATABASE IF NOT EXISTS findme;
USE findme;

-- Tabla de fichas médicas
CREATE TABLE IF NOT EXISTS fichas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug CHAR(36) NOT NULL UNIQUE,         -- UUID para poner en el NFC/URL
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  hospital VARCHAR(150) NOT NULL,
  condiciones VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Ejemplo de dato inicial
INSERT INTO fichas (slug, nombre, telefono, hospital, condiciones)
VALUES (UUID(), 'Juan Pérez', '+56 9 1234 5678', 'Hospital Clínico UC', 'Asma');
