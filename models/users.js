const db = require('../config/db');

const userDB = {
    getAllUsers: (callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT * FROM users"
                dbConn.query(sql, [], (err, result) => {

                    dbConn.end()
                    
                    if (err) {
                        callback(err);
                    }
                    return callback(err, result)
                })
            }
        })
    },

    getUser: (userID, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT * FROM users WHERE userid = ?"
                dbConn.query(sql, [userID], (err, result) => {

                    dbConn.end()
                    
                    if (err) {
                        callback(err);
                    }
                    return callback(err, result)
                })
            }
        })
    },


    insertUser: function (userid, email, contact, password, type, profile_pic_url, username, callback){
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO users(userid, email, contact, password, type, profile_pic_url, username) VALUES(?, ?,?,?,?,?,?)"
                dbConn.query(sql, [userid, email, contact, password, type, profile_pic_url, username], (err, result) => {

                    dbConn.end()
                    
                    if (err) {
                        callback(err);
                    }
                    return callback(err, result)
                })
            }
        })
    },

    updateUser: function (userid, email, contact, password, type, profile_pic_url, username, callback){
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "UPDATE users SET email = ?, contact = ?, password = ?, type = ?, profile_pic_url = ?, username = ? WHERE userid = ?"
                dbConn.query(sql, [email, contact, password, type, profile_pic_url, username, userid], (err, result) => {

                    dbConn.end()
                    
                    if (err) {
                        callback(err);
                    }
                    return callback(err, result)
                })
            }
        })
    }  
}

module.exports = userDB;