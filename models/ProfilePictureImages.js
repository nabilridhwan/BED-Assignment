const db = require('../config/db');

const ProfilePictureImages = {

    getPublicId: ({
        userid
    }, callback) => {
        userid = userid || null;

        var dbConn = db.getConnection();
        // Insert into the image table first
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                const sql = "SELECT public_id from profile_picture_images WHERE userid = ?"
                dbConn.query(sql, [userid], (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, result)
                })

            }
        })
    },
    insertProfilePicture: ({
        userid,
        url,
        public_id
    }, callback) => {
        var dbConn = db.getConnection();
        userid = userid || null;
        url = url || null;
        public_id = public_id || null;

        // Insert into the image table first
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                // See if there is a record, if none, then insert
                const sql = "SELECT * from profile_picture_images WHERE userid = ?";
                dbConn.query(sql, [userid], (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }
                    if (result.length == 0) {
                        console.log("No record found in database. Inserting new data!")
                        // Insert into the table
                        const insertSql = "INSERT INTO profile_picture_images (userid, url, public_id) VALUES (?, ?, ?)";
                        dbConn.query(insertSql, [userid, url, public_id], (err, result) => {
                            dbConn.end()
                            if (err) {
                                return callback(err, null);
                            }
                            return callback(null, result)
                        })
                    } else {
                        console.log("Found row in database. Updating data!")
                        // Update the table
                        const updateSql = "UPDATE profile_picture_images SET url = ?, public_id = ? WHERE userid = ?";
                        dbConn.query(updateSql, [url, public_id, userid], (err, result) => {
                            dbConn.end();
                            if (err) {
                                return callback(err, null);
                            }
                            return callback(null, result)
                        })
                    }
                })
            }
        })
    }
}

module.exports = ProfilePictureImages;