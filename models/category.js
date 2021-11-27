const db = require('../config/db');

const Category = {
    insertCategory: (category_name, category_description, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO category(category_name, category_description) VALUES(?,?)"
                dbConn.query(sql, [category_name, category_description], (err, result) => {

                    
                    if (err) {
                        callback(err);
                    }

                    dbConn.end()
                    return callback(err, result)
                })
            }
        })
    },

}

module.exports = Category;