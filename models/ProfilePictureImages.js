const db = require('../config/db');

const ProfilePictureImages = {
    insertProfilePicture: ({
        userid,
       url 
    }, callback) => {
        var dbConn = db.getConnection();
        userid = userid || null;
        url = url || null;

        // Insert into the image table first
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {

                const sql = "INSERT INTO profile_picture_images(userid, url) VALUES(?, ?)"
                dbConn.query(sql, [userid, url], (err, result) => {

                    if (err) {
                        return callback(err, null);
                    }

                    // const {insertId} = result;
                    const secondSql = "UPDATE users SET profile_pic_url = ? WHERE userid = ?"

                    // Update the table id;
                    dbConn.query(secondSql, [url, userid], (err, result) => {
                        dbConn.end()
                        if (err) {
                            return callback(err, null);
                        } else {
                            return callback(null, result)
                        }
                    })


                })
            }
        })
    },

}

module.exports = ProfilePictureImages;