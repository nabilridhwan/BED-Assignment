const mysql = require('mysql');

const dbconnect = {
    getConnection: function () {
        let conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'sp_it'
        });
        return conn;
    }
}

module.exports = dbconnect;