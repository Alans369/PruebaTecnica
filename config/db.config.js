require('dotenv').config(); // Carga las variables de entorno desde .env

module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    DB: process.env.DB_NAME || 'nombre_de_tu_base_de_datos'
};