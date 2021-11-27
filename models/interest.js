const db = require('../config/db');

const Interest = {
    insertInterests: ({userid, categoryids}, callback) => {

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