const db = require('../config/db');

const ProfilePictureImages = {
    insertProfilePicture: ({
        userid,
        filename
    }, callback) => {
        var dbConn = db.getConnection();

        userid = userid || null;

        filename = filename || null;

        // Insert into the image table first
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {

                const sql = "INSERT INTO profile_picture_images(userid, filename) VALUES(?, ?)"
                dbConn.query(sql, [userid, filename], (err, result) => {

                    if (err) {
                        return callback(err, null);
                    }

                    // const {insertId} = result;
                    const secondSql = "UPDATE users SET profile_pic_url = ? WHERE userid = ?"

                    const imageUrl = `http://localhost:8080/images/${filename}`

                    console.log(filename)
                    console.log(imageUrl)
                    console.log(userid)

                    // Update the table id;
                    dbConn.query(secondSql, [imageUrl, userid], (err, result) => {
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