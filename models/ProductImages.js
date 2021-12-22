const db = require('../config/db');

const ProductImages = {

    getImageByProductId: ({
        productId
    }, callback) => {

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {

            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT i.filename FROM products p, product_images i WHERE p.productid = i.productid AND p.productid = ?;"
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

    insertProductImages: ({
        productId,
        fileObject
    }, callback) => {
        var dbConn = db.getConnection();

        // Insert into the image table first
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                let sqlQueryError = false;
                const sql = "INSERT INTO product_images(productid, filename) VALUES(?, ?)"

                fileObject.forEach(({
                    filename
                }, index) => {
                    dbConn.query(sql, [productId, filename], (err, result) => {

                        // Check if there is an error
                        if (err) {
                            sqlQueryError = true;
                            // callback(err, null);
                        }

                        // Check if the loop is done
                        if (index == fileObject.length - 1) {

                            // Checks for the error, if error, returns callback error or else success
                            if (sqlQueryError) {
                                callback(err, null);
                            } else {
                                return callback(null, 'success')

                            }
                        }
                    })


                })

                dbConn.end()

            }
        })
    },

}

module.exports = ProductImages;