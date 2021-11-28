const db = require('../config/db');

const Interest = {

    getAllInterests: (callback) => {
        var dbConn = db.getConnection();

        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT u.userid, u.username, u.email, c.categoryid, c.category_name from interest i, users u, category c WHERE i.userid = u.userid AND i.categoryid = c.categoryid"
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
                const sql = "SELECT u.userid, u.username, u.email, c.categoryid, c.category_name from interest i, users u, category c WHERE i.userid = u.userid AND i.categoryid = c.categoryid AND u.userid = ?;"
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
        const categories = categoryids.replace(/\s/g, '').split(',');

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO interest(userid, categoryid) VALUES(?,?)"
                categories.forEach(categoryId => {
                    dbConn.query(sql, [userid, categoryId], (err, result) => {
                        if (err) {
                            return callback(err);
                        }
                    })
                })
                dbConn.end()
                return callback(null, 'success');
            }
        })
    },

}

module.exports = Interest;