const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');

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
            h.response(req, res, 201, {
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

module.exports = router;