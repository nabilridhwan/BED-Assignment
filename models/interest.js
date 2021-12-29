/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const db = require('../config/db');

const Interest = {

    getAllInterests: (callback) => {
        var dbConn = db.getConnection();

        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT u.userid, u.username, u.email, c.categoryid, c.category from interest i, users u, category c WHERE i.userid = u.userid AND i.categoryid = c.categoryid"
                dbConn.query(sql, [], (err, result) => {
                    dbConn.end();
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, result);
                    }
                })
            }
        })
    },

    getInterestsById: ({
        userid
    }, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT u.userid, u.username, u.email, c.categoryid, c.category from interest i, users u, category c WHERE i.userid = u.userid AND i.categoryid = c.categoryid AND u.userid = ?;"
                dbConn.query(sql, [userid], (err, result) => {

                    dbConn.end();
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, result);
                    }
                })
            }
        })
    },

    insertInterests: ({
        userid,
        categoryids
    }, callback) => {
        userid = userid || null;
        categoryids = categoryids ? categoryids.replace(/\s/g, '').split(',') : null;

        console.log(categoryids)

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                let sqlQueryError = false;
                const sql = "INSERT INTO interest(userid, categoryid) VALUES(?,?)"
                if(categoryids != null){
                    categoryids.forEach((categoryId, index) => {
                        dbConn.query(sql, [userid, categoryId], (err, result) => {
                            if (err) {
                                sqlQueryError = true;
                            }
    
                            // Check if the loop is done
                            if (index == categoryids.length - 1) {
    
                                // Checks for the error, if error, returns callback error or else success
                                if (sqlQueryError) {
                                    callback(err, null);
                                } else {
                                    return callback(null, 'success')
    
                                }
                            }
                        })
                    })
                }else{
                    callback(true, null);
                }
                dbConn.end()
            }
        })
    },

}

module.exports = Interest;