const db = require('../config/db');

const ProductImages = {
    getPublicId: ({
        productid
    }, callback) => {
        productid = productid || null;

        var dbConn = db.getConnection();
        // Insert into the image table first
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                const sql = "SELECT public_id from product_images WHERE productid = ?"
                dbConn.query(sql, [productid], (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, result)
                })

            }
        })
    },
    getImageByProductId: ({
        productId
    }, callback) => {
        productId = productId || null;

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {

            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT i.url FROM products p, product_images i WHERE p.productid = i.productid AND p.productid = ?;"
                dbConn.query(sql, [productId], (err, result) => {

                    dbConn.end()

                    if (err) {
                        callback(err);
                    } else {
                        return callback(err, result)
                    }

                })
            }

        });

    },

    deleteImagesByProductId: (productId, callback) => {
        productId = productId || null;

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {

                // Delete every entry with the id of productId
                const deleteSql = "DELETE FROM product_images WHERE productid = ?";

                dbConn.query(deleteSql, [productId], (err, result) => {

                    dbConn.end()

                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result)
                    }

                })
            }
        })

    },

    getPublicId: (productid, callback) => {
        productid = productid || null;
        let dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                const sql = "SELECT public_id from product_images WHERE productid = ?"
                dbConn.query(sql, [productid], (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, result)
                })

            }
        })
    },

    insertProductImage: ({
        productId,
        url,
        public_id
    }, callback) => {
        var dbConn = db.getConnection();
        productId = productId || null;
        url = url || null;
        public_id = public_id || null;

        // Insert into the image table first
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {

                const sql = "INSERT INTO product_images(productid, url, public_id) VALUES(?,?, ?)"

                // Inserts into the database
                dbConn.query(sql, [productId, url, public_id], (err, result) => {

                    dbConn.end()
                    if (err) {
                        callback(err, null);
                    } else {
                        return callback(null, 'success')
                    }
                })

            }
        })
    },

}

module.exports = ProductImages;