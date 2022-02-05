/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');

const multer = require("multer")
const ProfilePictureImages = require('../models/ProfilePictureImages.js');

// Require cloudinary
const Cloudinary = require('../utils/cloudinary.js');
const isUserLoggedIn = require('../auth/isUserLoggedIn.js');

// profile_picture field only accepts 1 image with limit of 1MB
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        // Check the file type
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error("The file provided is not a jpeg, jpg or png file"));
        }
    }
}).single("profile_picture")

// Endpoint 1: POST users 
router.post("/users", async (req, res) => {
    try {
        // Insert the user
        const insert = await Users.insertUser(req.body);
        return res.status(201).json({
            userid: insert.insertId
        })

    } catch (err) {
        if (err.errno == 1062) {
            return res.status(422).send("The email or username provided already exists");
        }

        return res.status(500).send(err)
    }
})

// Endpoint 2: GET /users
router.get("/users", async (req, res) => {
    try {
        // Get all users
        const users = await Users.getAllUsers();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).send(err)
    }
})

// Endpoint 3: GET /users/:id
router.get("/users/:id", async (req, res) => {

    // check if the id is a number
    if (isNaN(req.params.id)) {
        return res.status(400).send("The User ID provided must be a number")
    }

    // Get user by ID
    try {
        const users = await Users.getUser({
            id: req.params.id
        })
        return res.json(users);
    } catch (e) {
        console.log(e)
        return res.status(500).send(e);
    }

})

// Endpoint 4: PUT /users/:id
router.put("/users/:id", isUserLoggedIn, async (req, res) => {

    if (req.params.id != req.userid) {
        return res.sendStatus(403);
    }

    // check if the id is a number
    if (isNaN(req.params.id)) {
        return res.status(400).send("The User ID provided must be a number")
    }

    try {
        // Update the user
        await Users.updateUser({
            id: req.params.id,
            ...req.body
        })

        return res.sendStatus(204);

    } catch (e) {
        console.log(e)
        if (e.errno == 1062) return res.status(422).send("The new username OR new email provided already exists.")
        if (e.errno == 1048) return res.sendStatus(400);

        return res.status(500).send(e);
    }
})

// User profile image url
router.post("/users/:userid/image", isUserLoggedIn, async (req, res) => {

    // Check if req.params.userid is a number
    if (isNaN(req.params.userid)) {
        return res.status(400).send("The User ID provided must be a number")
    }

    // if (req.params.userid != req.userid) {
    //     return res.sendStatus(403);
    // }

    try {
        const users = await Users.getUser({
            id: req.params.userid
        })
        if (users.length == 0) return res.sendStatus(404);

    } catch (e) {
        return res.status(500).send(e);
    }
    upload(req, res, async (err) => {

        // Error checking!
        if (err) {
            if (err.message == "File too large") {
                return res.sendStatus(413);
            }
            if (err.message == "Unexpected field") err.message = "'profile_picture' field not found OR select only ONE image"

            if (err.message == "The file provided is not a jpeg, jpg or png file") {
                return res.sendStatus(415)
            }
            return res.status(500).send(err);
        } else {
            // If there is no file, return with a status code of 400 indicating a bad request
            if (!req.file) {
                return res.status(400).send("There is no image provided");
            }

            // Get public id of the user's profile picture

            try {
                const publicIds = ProfilePictureImages.getPublicId({
                    userid: req.params.userid
                })

                // Delete the image from cloudinary if public id is found
                if (publicIds.length > 0) {
                    let public_id = publicIds[0].public_id
                    try {
                        // There is a public id! Proceed to delete it!
                        await Cloudinary.deleteFileFromCloudinary(public_id)
                    } catch (error) {
                        console.log(error)
                        return res.status(500).send(error);
                    }
                }
            } catch (e) {
                return res.status(500).send(e);
            }

            try {
                // Upload the image to cloudinary
                let data = await Cloudinary.uploadFileToCloudinary(req.file.buffer, "profile_pictures");

                // Get the public id and url of the image
                const {
                    public_id,
                    secure_url
                } = data;

                // Delete all the images from the database
                await ProfilePictureImages.deleteAllProfilePictures({
                    ...req.params
                })

                try {

                    // Insert into database
                    await ProfilePictureImages.insertProfilePicture({
                        ...req.params,
                        url: secure_url,
                        public_id
                    });

                    console.log("Nice! Inserted profile picture into database successfully")

                    try { // Finally, update the user's profile picture url in the users table
                        await Users.updateProfilePictureUrl({
                            ...req.params,
                            profile_pic_url: secure_url
                        })

                        console.log("Successfully updated profile picture url in database")
                        return res.sendStatus(204);
                    } catch (e) {
                        console.log(e)
                        return res.status(500).send(e)
                    }
                } catch (e) {
                    console.log(e)
                    return res.status(500).send(e);
                }
            } catch (error) {
                console.log(error)
                return res.status(500).send(error);

            }
        }
    })



})

module.exports = router;