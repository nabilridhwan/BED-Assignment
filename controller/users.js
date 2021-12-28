const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');

const multer = require("multer")
const ProfilePictureImages = require('../models/ProfilePictureImages.js');
const Cloudinary = require('../utils/cloudinary.js');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error("The file is not a jpeg, jpg or png file"));
        }
    }
}).single("profile_picture")

// Endpoint 1: POST users 
router.post("/users", (req, res) => {
    Users.insertUser(req.body, (err, data) => {
        if (err) {

            console.log(err)
            const errorNumber = err.errno;
            if (errorNumber === 1062) {
                res.status(422).send("The email or username provided already exists");
            } else {
                res.sendStatus(500);
            }
        } else {
            res.status(201).json({
                userid: data.insertId
            });
        }
    })
})

// Endpoint 2: GET /users
router.get("/users", (req, res) => {
    Users.getAllUsers((err, users) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(users);
        }
    })
})

// Endpoint 3: GET /users/:id
router.get("/users/:id", (req, res) => {
    const {
        id
    } = req.params;

    if (isNaN(id)) {
        res.status(400).send("The User ID provided must be a number")
    } else {
        Users.getUser({
            id
        }, (err, users) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (users.length == 0) {
                    res.sendStatus(404);
                } else {
                    res.status(200).json(users);
                }
            }
        })
    }

})


// Endpoint 4: PUT /users/:id
router.put("/users/:id", (req, res) => {
    const {
        id
    } = req.params;

    if (isNaN(id)) {
        res.status(400).send("The User ID provided must be a number")
    } else {
        Users.updateUser({
            id,
            ...req.body
        }, (err, data) => {
            if (err) {
                console.log(err)
                if (err.errno === 1062) {
                    res.status(422).send("The new username OR new email provided already exists.")
                } else {
                    res.sendStatus(500);
                }
            } else {
                if (data.length > 0) {
                    res.sendStatus(204);
                } else {
                    res.sendStatus(404);
                }
            }
        })
    }
})

// User profile image url
router.post("/users/:userid/image", (req, res) => {

    // Check if req.params.userid is a number
    if(isNaN(req.params.userid)){
        return res.status(400).send("The User ID provided must be a number")
    }

    upload(req, res, (err) => {
        if (err) {
            if (err.message == "File too large") err.message += ". The limit is 1MB";
            return res.status(500).send(err.message);
        } else {
            // If there is no file, return with a status code of 400 indicating a bad request
            if (!req.file) {
                return res.status(400).send("There is no image provided");
            }

            // Get public id of the user's profile picture
            ProfilePictureImages.getPublicId({
                userid: req.params.userid
            }, async (err, result) => {
                if (err) {
                    return res.sendStatus(500);
                }

                // Delete the image from cloudinary if public id is found
                if (result.length > 0) {
                    let arrayOfPublicIds = result[0].public_id
                    try {
                        // There is a public id! Proceed to delete it!
                        let data = await Cloudinary.deleteFileFromCloudinary(arrayOfPublicIds)
                        // Deleted successfully
                        if (data.result == "ok") {
                            console.log("Deleted profile picture from cloudinary successfully")
                        } else {
                            console.log("No profile picture found in cloudinary... Adding one!")
                        }
                    } catch (error) {
                        return res.status(500).send(error);
                    }
                }

                // Upload the image to cloudinary
                // Update or insert the profile picture

                try {
                    Users.getUser({
                        id: req.params.userid
                    }, async (err, result) => {
                        if (err) {
                            return res.sendStatus(500);
                        }

                        // If user is found
                        if (result.length > 0) {
                            let data = await Cloudinary.uploadFileToCloudinary(req.file.buffer, "profile_pictures");
                            const {
                                public_id,
                                secure_url
                            } = data;

                            ProfilePictureImages.deleteAllProfilePictures({
                                ...req.params
                            }, (err, data) => {
                                if (err) {
                                    return res.sendStatus(500);
                                } else {
                                    // Insert into database
                                    ProfilePictureImages.insertProfilePicture({
                                        ...req.params,
                                        url: secure_url,
                                        public_id
                                    }, (err, data) => {
                                        if (err) {
                                            return res.status(500).send(err);
                                        } else {
                                            console.log("Nice! Inserted profile picture into database successfully")

                                            Users.updateProfilePictureUrl({
                                                ...req.params,
                                                profile_pic_url: secure_url
                                            }, (err, data) => {
                                                if (err) {
                                                    return res.sendStatus(500)
                                                } else {
                                                    console.log("Successfully updated profile picture url in database")
                                                    return res.sendStatus(204)
                                                }
                                            })

                                        }
                                    })

                                }
                            })

                        } else {
                            res.sendStatus(404)
                        }
                    })
                } catch (error) {
                    return res.status(500).send(error);

                }
            })
        }
    })



})

module.exports = router;