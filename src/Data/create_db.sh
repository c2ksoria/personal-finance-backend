#!/bin/bash

# Configuración
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="root"
DB_PASS="123456"
DB_NAME="finance"

# SQL de creación
SQL_COMMANDS=$(cat <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME;

USE $DB_NAME;

CREATE TABLE IF NOT EXISTS category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS movements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category INT NOT NULL,
    type INT NOT NULL,
    details TEXT,
    Date DATE,
    quantity DECIMAL(10,2),
    FOREIGN KEY (category) REFERENCES category(id),
    FOREIGN KEY (type) REFERENCES type(id)
);

-- Insertar categorías si no existen
INSERT IGNORE INTO category (id, name) VALUES
    (1, 'Comida'),
    (2, 'Transporte'),
    (3, 'Educación'),
    (4, 'Entretenimiento'),
    (5, 'Bebida'),
    (6, 'Servicios');

-- Insertar tipos si no existen
INSERT IGNORE INTO type (id, name) VALUES
    (1, 'Ingreso'),
    (2, 'Gasto');
EOF
)

# Ejecutar comandos SQL
echo "Creando base de datos, tablas y registros iniciales..."
mysql --protocol=TCP -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p -e "$SQL_COMMANDS"

if [ $? -eq 0 ]; then
    echo "✅ Base de datos y registros iniciales creados correctamente."
else
    echo "❌ Error al ejecutar el script SQL."
fi
