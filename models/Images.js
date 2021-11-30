const db = require('../config/db');

const Images = {

    getImage: ({imageId}, callback) => {

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {

            if (err) {
                callback(err, null);
            } else {
                const sql = "SELECT images.imageid, images.filename FROM images WHERE imageid = ?"
                dbConn.query(sql, [imageId], (err, result) => {
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
    
    insertImage: ({filename}, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO images(filename) VALUES(?)"
                dbConn.query(sql, [filename], (err, result) => {
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

}

module.exports = Images;