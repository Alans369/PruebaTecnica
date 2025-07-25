const mysql = require('mysql2/promise');

let connection = null;

async function testConnection() {
    try {
        connection = await mysql.createConnection({
            host: "mysql-test-esfe-8ff0.b.aivencloud.com",
            port: 20787,
            user: "avnadmin",
            password: "AVNS_PfxZhqEHsyFEn50ylaO",
            database: "Test"
        });

     
        return true;
    } catch (error) {
        console.error('Error de conexión:', error);
        return false;
    }
}

testConnection()
    .then(success => {
        if (success) {
            console.log('Conexión a la base de datos exitosa');
        } else {
            console.log('No se pudo conectar a la base de datos');
        }
    });

module.exports = {
    testConnection,
    getConnection: () => connection,
    query: (...args) => connection.query(...args)
};
