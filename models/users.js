/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const db = require('../config/db');

const userDB = {
    getAllUsers: (callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT userid, username, email, contact, type, profile_pic_url, created_at FROM users"
                dbConn.query(sql, [], (err, result) => {

                    dbConn.end()

                    if (err) {
                        return callback(err);
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
                const sql = "SELECT userid, username, email, contact, type, profile_pic_url, created_at FROM users WHERE userid = ?"
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
        username,
        password
    }, callback) {

        email = email || null;
        contact = contact || null;
        type = type || null;
        profile_pic_url = profile_pic_url || null;
        username = username || null;
        password = password || null;

        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO users(email, contact, password, type, profile_pic_url, username) VALUES(?,?,?,?,?,?)"
                dbConn.query(sql, [email, contact, password, type, profile_pic_url, username], (err, result) => {

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
        username,
        password
    }, callback) {

        email = email || null;
        contact = contact || null;
        type = type || null;
        profile_pic_url = profile_pic_url || null;
        username = username || null;
        id = id || null;
        password = password || null;

        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "UPDATE users SET password = ?, email = ?, contact = ?, type = ?, profile_pic_url = ?, username = ? WHERE userid = ?"
                dbConn.query(sql, [password, email, contact, type, profile_pic_url, username, id], (err, result) => {

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

    updateProfilePictureUrl: ({
        profile_pic_url,
        userid
    }, callback) => {
        userid = userid || null;
        profile_pic_url = profile_pic_url || null;

        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "UPDATE users SET profile_pic_url = ? where userid = ?"
                dbConn.query(sql, [profile_pic_url, userid], (err, result) => {
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