const db = require('../config/db');

const Category = {
    getAllCategories: (callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT * FROM category"
                dbConn.query(sql, [], (err, result) => {
                    dbConn.end()
                    
                    if (err) {
                        callback(err);
                    }else{
                        return callback(err, result)
                    }

                })
            }
        })
    },
    
    insertCategory: ({category, description}, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO category(category, description) VALUES(?,?)"
                dbConn.query(sql, [category, description], (err, result) => {
                    dbConn.end()

                    
                    if (err) {
                        callback(err);
                    }else{
                        return callback(err, result)
                    }

                })
            }
        })
    },

}

module.exports = Category;