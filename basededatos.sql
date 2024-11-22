
CREATE DATABASE IF NOT EXISTS legalconsult;


USE legalconsult;


CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    rol ENUM('admin', 'abogado', 'cliente') NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS consultas (
    consulta_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descripcion TEXT NOT NULL,
    estado ENUM('pendiente', 'en_progreso', 'completada') DEFAULT 'pendiente',
    creada_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);


INSERT INTO usuarios (nombre, email, rol) VALUES
('Juan Perez', 'juan.perez@example.com', 'cliente'),
('Maria Gonzalez', 'maria.gonzalez@example.com', 'abogado'),
('Admin User', 'admin@example.com', 'admin');


INSERT INTO consultas (usuario_id, descripcion, estado) VALUES
(1, 'Consulta sobre contrato laboral', 'pendiente'),
(2, 'Consulta sobre derechos civiles', 'en_progreso');