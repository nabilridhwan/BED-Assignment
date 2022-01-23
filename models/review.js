/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const db = require('../config/db');

const Reviews = {

    insertReview: ({
        productid,
        userid,
        rating,
        review,
    }) => {

        productid = productid || null;
        userid = userid || null;
        rating = rating || null;
        review = review || null;

        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "INSERT INTO reviews(productid, userid, rating, review) VALUES(?,?,?,?)"
                    dbConn.query(sql, [productid, userid, rating, review], (err, result) => {
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

}

module.exports = Reviews;