/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const db = require('../config/db');

const Discount = {
    getAllDiscounts: (callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT p.name, p.description, p.categoryid, c.category as categoryname, p.brand, p.price as before_discounted_price, d.id as discount_id, da.discount_description, da.discount_amt, da.discount_type, dd.from, dd.to FROM discounts d, discount_dates dd, discount_amount da, products p, category c WHERE d.fk_discount_amount = da.id AND d.fk_discount_date = dd.id AND p.categoryid = c.categoryid AND d.productid = p.productid;"
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
    
    getDiscountForProduct: ({productid}, callback) =>{

        productid = productid || null;
        
        var dbConn = db.getConnection();
        
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT p.name, p.description, p.categoryid, c.category as categoryname, p.brand, p.price as before_discounted_price, d.id as discount_id, da.discount_description, da.discount_amt, da.discount_type, dd.from, dd.to FROM discounts d, discount_dates dd, discount_amount da, products p, category c WHERE d.fk_discount_amount = da.id AND d.fk_discount_date = dd.id AND p.categoryid = c.categoryid AND d.productid = p.productid AND d.productid = ?;"
                dbConn.query(sql, [productid], (err, result) => {
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

    insertDiscount: ({
        fk_discount_amount,
        fk_discount_date,
        productid
    }, callback) => {

        fk_discount_amount = fk_discount_amount || null;
        fk_discount_date = fk_discount_date || null;
        productid = productid || null;

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO discounts(fk_discount_amount, fk_discount_date, productid) VALUES(?,?,?)"
                dbConn.query(sql, [fk_discount_amount, fk_discount_date, productid], (err, result) => {
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

    deleteDiscount: ({
        discount_id
    }, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "DELETE FROM discounts WHERE id = ?"
                dbConn.query(sql, [discount_id], (err, result) => {
                    dbConn.end()


                    if (err) {
                        callback(err);
                    } else {
                        return callback(err, result)
                    }

                })
            }
        })
    }

}

module.exports = Discount;