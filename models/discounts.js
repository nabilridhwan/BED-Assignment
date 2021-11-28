const db = require('../config/db');

const Discount = {
    getAllDiscounts: (callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT * FROM discounts"
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
    
    insertDiscount: ({from_discount, to_discount, discount_value, discount_type, discount_product_id}, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO discounts(from_discount, to_discount, discount_value, discount_type, discount_product_id) VALUES(?,?,?,?,?)"
                dbConn.query(sql, [from_discount, to_discount, discount_value, discount_type, discount_product_id], (err, result) => {
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

    deleteDiscount: ({discount_id}, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "DELETE FROM discounts WHERE discountid = ?"
                dbConn.query(sql, [discount_id], (err, result) => {
                    dbConn.end()

                    
                    if (err) {
                        callback(err);
                    }else{
                        return callback(err, result)
                    }

                })
            }
        })
    }

}

module.exports = Discount;