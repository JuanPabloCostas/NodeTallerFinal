const mysql = require('mysql');

const connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = connection;