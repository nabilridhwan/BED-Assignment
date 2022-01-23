/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const db = require('../config/db');

const ProfilePictureImages = {
    getPublicId: ({
        userid
    }, callback) => {
        userid = userid || null;

        return new Promise((resolve, reject) => {


            var dbConn = db.getConnection();
            // Insert into the image table first
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "SELECT public_id from profile_picture_images WHERE userid = ?"
                    dbConn.query(sql, [userid], (err, result) => {
                        dbConn.end();
                        if (err) {
                            reject(err);
                        }

                        resolve(result);
                    })

                }
            })
        })
    },

    deleteAllProfilePictures: ({
        userid
    }) => {

        return new Promise((resolve, reject) => {

            const sql = "DELETE FROM profile_picture_images WHERE userid = ?"

            var dbConn = db.getConnection();

            dbConn.connect((err) => {
                if (err) reject(err);

                dbConn.query(sql, [userid], (err, result) => {
                    dbConn.end()
                    if (err) {
                        reject(err);
                    }
                    console.log("Deleted from profile_picture_images table successfully")
                    resolve();
                })

            })
        })
    },

    insertProfilePicture: ({
        userid,
        url,
        public_id
    }) => {
        console.log("Insert function")
        userid = userid || null;
        url = url || null;
        public_id = public_id || null;


        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    // Insert into the image table first
                    const sql = "INSERT INTO profile_picture_images (userid, url, public_id) VALUES (?, ?, ?)"
                    dbConn.query(sql, [userid, url, public_id], (err, result) => {

                        dbConn.end();
                        if (err) {
                            console.log("Error inserting into profile_picture_images table")
                            reject(err);
                        }

                        console.log("Inserted into profile_picture_images table successfully")
                        resolve(result);
                    })

                }
            })
        })
    }
}

module.exports = ProfilePictureImages;