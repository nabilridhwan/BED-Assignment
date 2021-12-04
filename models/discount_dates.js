const db = require('../config/db');

const DiscountDates = {
    getAllDiscountDates: (callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT * FROM discount_dates;"
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

    insertDiscountDate: ({
        from_date,
        to_date
    }, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO discount_dates(`from`, `to`) VALUES(?,?);"
                dbConn.query(sql, [from_date, to_date], (err, result) => {
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

module.exports = DiscountDates;