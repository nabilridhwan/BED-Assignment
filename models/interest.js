/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const db = require('../config/db');

const Interest = {

    getAllInterests: () => {

        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection();

            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "SELECT u.userid, u.username, u.email, c.categoryid, c.category from interest i, users u, category c WHERE i.userid = u.userid AND i.categoryid = c.categoryid"
                    dbConn.query(sql, [], (err, result) => {
                        dbConn.end();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                }
            })
        })
    },

    getInterestsById: ({
        userid
    }, callback) => {

        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "SELECT u.userid, u.username, c.categoryid, c.category from interest i, users u, category c WHERE i.userid = u.userid AND i.categoryid = c.categoryid AND u.userid = ?;"
                    dbConn.query(sql, [userid], (err, result) => {

                        dbConn.end();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                }
            })
        })
    },

    insertInterests: ({
        userid,
        categoryids
    }) => {
        userid = userid || null;
        categoryids = categoryids != null && categoryids.length > 0 ? categoryids.replace(/\s/g, '').split(',') : null;

        return new Promise((resolve, reject) => {


            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    if (categoryids != null) {
                        const sql = "INSERT INTO interest(userid, categoryid) VALUES(?,?)"

                        let categoryPromises = categoryids.map(categoryId => {
                            return new Promise((resolve, reject) => {
                                dbConn.query(sql, [userid, categoryId], (err, result) => {

                                    if (err) {
                                        reject(err)
                                    } else {
                                        resolve(result)
                                    }
                                })
                            })
                        })

                        Promise.all(categoryPromises)
                            .then(data => {
                                resolve(data);
                            }).catch(e => {
                                console.log("Error", e)
                                reject(e)
                            }).finally(() => {
                                dbConn.end()
                            })

                    } else {
                        reject("No category ids provided")
                    }
                }
            })
        })
    },

    clearInterestByUserId(userid) {
        userid = userid || null;

        return new Promise((resolve, reject) => {
            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "DELETE FROM interest WHERE userid = ?"
                    dbConn.query(sql, [userid], (err, result) => {
                        dbConn.end();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                }
            })
        })
    }

}

module.exports = Interest;