const db = require('../config/db');

const DiscountAmount = {
    getAllDiscountAmount: (callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT * FROM discount_amount;"
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

    insertDiscountAmount: ({discount_description, discount_amt, discount_type},callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO discount_amount(discount_description, discount_amt, discount_type) VALUES(?,?,?);"
                dbConn.query(sql, [discount_description, discount_amt, discount_type], (err, result) => {
                    dbConn.end()
                    if (err) {
                        callback(err);
                    } else {
                        return callback(err, result.insertId)
                    }

                })
            }
        })
    }

}

module.exports = DiscountAmount;