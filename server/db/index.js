const mysql2 = require("mysql2")
const { HOST,
    USER,
    DB_PORT,
    PASSWORD,
    DATABASE } = process.env

const connection = mysql2.createConnection(
    {
        host: HOST,
        port: DB_PORT,
        user: USER,
        password: PASSWORD,
        database: DATABASE
    }
)

module.exports = connection;