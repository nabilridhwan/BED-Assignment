/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const db = require('../config/db');
const {
    generateHash,
    verifyPassword
} = require('../utils/password')

const userDB = {
    getAllUsers: () => {

        return new Promise((resolve, reject) => {

            const dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "SELECT userid, username, email, contact, type, profile_pic_url, created_at FROM users"
                    dbConn.query(sql, [], (err, result) => {

                        dbConn.end()

                        if (err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }
                    })
                }
            })
        })
    },

    getUser: ({
        id
    }) => {

        return new Promise((resolve, reject) => {

            const dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "SELECT userid, username, email, contact, type, profile_pic_url, created_at FROM users WHERE userid = ?"
                    dbConn.query(sql, [id], (err, result) => {

                        dbConn.end()

                        if (err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }
                    })
                }
            })
        })
    },


    insertUser: function ({
        email,
        contact,
        type,
        profile_pic_url,
        username,
        password
    }) {

        email = email || null;
        contact = contact || null;
        type = type || null;
        profile_pic_url = profile_pic_url || null;
        username = username || null;
        password = password || null;

        return new Promise((resolve, reject) => {
            const dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {

                    generateHash(password).then(hash => {
                        const sql = "INSERT INTO users(email, contact, password, type, profile_pic_url, username) VALUES(?,?,?,?,?,?)"
                        dbConn.query(sql, [email, contact, hash, type, profile_pic_url, username], (err, result) => {

                            dbConn.end()

                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        })
                    }).catch(e => {
                        reject(e);
                    })
                }
            })
        })
    },

    updateUser: function ({
        id,
        email,
        contact,
        type,
        username,
        password
    }) {

        email = email || null;
        contact = contact || null;
        type = type || null;
        username = username || null;
        id = id || null;
        password = password || null;

        return new Promise((resolve, reject) => {
            const dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {

                    if (password) {
                        generateHash(password).then(hash => {

                            const sql = "UPDATE users SET password = ?, email = ?, contact = ?, type = ?, username = ? WHERE userid = ?"
                            dbConn.query(sql, [hash, email, contact, type, username, id], (err, result) => {

                                dbConn.end()

                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result)
                                }
                            })

                        }).catch(e => {
                            reject(e);
                        })
                    } else {
                        const sql = "UPDATE users SET email = ?, contact = ?, type = ?, username = ? WHERE userid = ?"
                        dbConn.query(sql, [email, contact, type, username, id], (err, result) => {

                            dbConn.end()

                            if (err) {
                                reject(err);
                            } else {
                                resolve(result)
                            }
                        })
                    }


                }
            })
        })
    },

    updateProfilePictureUrl: ({
        profile_pic_url,
        userid
    }) => {
        userid = userid || null;
        profile_pic_url = profile_pic_url || null;

        return new Promise((resolve, reject) => {
            const dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "UPDATE users SET profile_pic_url = ? where userid = ?"
                    dbConn.query(sql, [profile_pic_url, userid], (err, result) => {
                        dbConn.end()
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }
                    })
                }
            })
        })
    },

    verify: ({
        email,
        password
    }) => {
        email = email || null;
        password = password || null;

        return new Promise((resolve, reject) => {
            const dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    callback(err, null);
                } else {
                    const sql = "SELECT userid, type, password FROM users WHERE email = ?"
                    dbConn.query(sql, [email, password], (err, result) => {

                        dbConn.end()

                        if (err) {
                            reject(err);
                        }

                        if (result.length > 0) {
                            // Check if the password matches
                            verifyPassword(password, result[0].password).then(isMatch => {
                                if (isMatch) {
                                    const {
                                        userid,
                                        type
                                    } = result[0];
                                    resolve([{
                                        userid,
                                        type
                                    }]);
                                } else {
                                    reject("Invalid Password")
                                }
                            }).catch(e => {
                                reject(e);
                            })
                        } else {
                            reject("No user found")
                        }

                    })
                }
            })
        })
    }
}

module.exports = userDB;