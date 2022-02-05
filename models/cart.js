/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const db = require('../config/db');

const Cart = {
    insertItem: ({
        userid,
        productid,
        price,
        quantity,
        name
    }) => {

        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = `INSERT INTO cart(userid, productid, name, quantity, price) VALUES(?,?,?,?,?)`
                    dbConn.query(sql, [userid, productid, name, quantity, price], (err, result) => {
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

    getPurchases: (userid) => {
        var dbConn = db.getConnection();
        return new Promise((resolve, reject) => {

            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = `SELECT * FROM cart WHERE userid = ?`
                    dbConn.query(sql, [userid], (err, result) => {
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
    }

}

module.exports = Cart;