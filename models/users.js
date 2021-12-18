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
                    } else {
                        return callback(err, result)
                    }
                })
            }
        })
    },

    getUser: ({
        id
    }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT * FROM users WHERE userid = ?"
                dbConn.query(sql, [id], (err, result) => {

                    dbConn.end()

                    if (err) {
                        callback(err);
                    } else {
                        return callback(err, result)
                    }
                })
            }
        })
    },


    insertUser: function ({
        email,
        contact,
        type,
        profile_pic_url,
        username
    }, callback) {

        email = email || null;
        contact = contact || null;
        type = type || null;
        profile_pic_url = profile_pic_url || null;
        username = username || null;

        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO users(email, contact, type, profile_pic_url, username) VALUES(?,?,?,?,?)"
                dbConn.query(sql, [email, contact, type, profile_pic_url, username], (err, result) => {

                    dbConn.end()

                    if (err) {
                        callback(err);
                    } else {
                        return callback(err, result)
                    }
                })
            }
        })
    },

    updateUser: function ({
        id,
        email,
        contact,
        type,
        profile_pic_url,
        username
    }, callback) {

        email = email || null;
        contact = contact || null;
        type = type || null;
        profile_pic_url = profile_pic_url || null;
        username = username || null;
        id = id || null;

        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "UPDATE users SET email = ?, contact = ?, type = ?, profile_pic_url = ?, username = ? WHERE userid = ?"
                dbConn.query(sql, [email, contact, type, profile_pic_url, username, id], (err, result) => {

                    dbConn.end()

                    if (err) {
                        callback(err);
                    } else {
                        return callback(err, result)
                    }
                })
            }
        })
    }
}

module.exports = userDB;