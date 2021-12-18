const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');

const multer = require("multer")
const Images = require("../models/Images")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"));
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filetype = file.mimetype.split('/')[1];
        cb(null, uniqueSuffix + "." + filetype)
    }
})

const upload = multer({
    storage: storage,
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
}).single('profile_picture')

// Endpoint 1: POST users 
router.post("/users", (req, res) => {
    Users.insertUser(req.body, (err, data) => {
        if (err) {

            console.log(err)
            const errorNumber = err.errno;
            if (errorNumber === 1062) {
                res.sendStatus(422);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.status(201).json({userid: data.insertId});
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
    Users.getUser({
        id: req.params.id
    }, (err, users) => {
        if (err) {
            res.sendStatus(500);

        } else {
            res.status(200).json(users);
        }
    })
})


// Endpoint 4: PUT /users/:id
router.put("/users/:id", (req, res) => {
    Users.updateUser({
        id: req.params.id,
        ...req.body
    }, (err, data) => {
        if (err) {
            if (err.errno === 1062) {
                res.sendStatus(422);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(204);
        }
    })
})

// User profile image url
router.post("/users/:userid/image", (req, res) => {
    // Upload an image for a specific product
    // Insert the page
    upload(req, res, function (err) {

        // Error handling for 
        if (err) {
            if(err.message == "File too large") err.message += ". The limit is 1MB";
            res.status(500).send(err.message);
        } else {

            const {
                filename
            } = req.file;

            Images.insertProfilePicure({
                ...req.params,
                filename: filename
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    })
})

module.exports = router;