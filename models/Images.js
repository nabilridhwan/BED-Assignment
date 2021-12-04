const db = require('../config/db');

const Images = {

    getImageByProductId: ({productId}, callback) => {

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {

            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT i.filename FROM products p, images i WHERE p.image_id = i.imageid AND p.productid = ?;"
                dbConn.query(sql, [productId], (err, result) => {
                    dbConn.end()

                    if (err) {
                        callback(err);
                    }else{
                        return callback(err, result)
                    }

                })
            }
            
        });
        
    },

    updateImage: ({productId}, callback) => {
        this.getImageByProductId({...productId}, (err, result) => {
            if(result){
                // Delete the product
                this.deleteImageByProductId({...productId}, (err, result) => {
                    if(err){
                        callback(err, null)
                        
                    }else{
                        this.insertImage({...productId, ...filename}, (err, result) => {
                            if(err){
                                callback(err, null)
                            }else{
                                callback(null, result)
                            }
                        })
                    }
                })
            }else{
                callback(err, null)
            }
        })
    },

    deleteImageByProductId: ({productId}, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "DELETE FROM images WHERE images.product_id = ?"
                dbConn.query(sql, [productId], (err, result) => {
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
    
    insertImage: ({productId, filename}, callback) => {
        var dbConn = db.getConnection();

        // Insert into the image table first
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                const sql = "INSERT INTO images(filename) VALUES(?)"
                dbConn.query(sql, [filename], (err, result) => {

                    const {insertId} = result;
                    const secondSql = "UPDATE products SET image_id = ? WHERE productid = ?"

                    // Update the table id;
                    dbConn.query(secondSql, [insertId, productId], (err, result) => {
                        dbConn.end()
                        if (err) {
                            return callback(err, null);
                        }else{
                            return callback(null, result)
                        }
                    })


                })
            }
        })
    },

}

module.exports = Images;