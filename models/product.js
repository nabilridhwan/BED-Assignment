const db = require('../config/db');

const Product = {

    insertProduct: ({
        product_name,
        product_description,
        categoryid,
        brand,
        price
    }, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO products(product_name, product_description, categoryid, brand, price) VALUES(?, ?, ?, ?, ?)"
                dbConn.query(sql, [product_name, product_description, categoryid, brand, price], (err, result) => {
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

    getAllProducts: (callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT * FROM products"
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

    getProduct: ({id}, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT p.productid, p.product_name, p.product_description, p.categoryid, c.category_name as categoryname, p.brand, p.price, p.image_id FROM products p, category c WHERE p.categoryid = c.categoryid AND p.productid = ?;"
                dbConn.query(sql, [id], (err, result) => {
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

    updateImage: ({imageId, productId}, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "UPDATE products SET image_id = ? WHERE productid = ?"
                dbConn.query(sql, [imageId, productId], (err, result) => {
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

    deleteProduct: ({id}, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "DELETE FROM products WHERE productid = ?"
                dbConn.query(sql, [id], (err, result) => {
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

    getReviewsForProduct: ({id}, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT p.productid, u.userid, u.username, r.rating, r.review, r.created_at FROM products p, reviews r, users u WHERE p.productid = r.productid AND r.userid = u.userid AND r.productid = ?;"
                dbConn.query(sql, [id], (err, result) => {
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

module.exports = Product;