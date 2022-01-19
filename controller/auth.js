const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../models/users');

router.post("/login", async (req, res) => {
    // Username and password from the request body
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.sendStatus(400);
    }

    try {
        let result = await User.verify({
            email,
            password
        })
        if (result.length > 0) {

            const payload = {
                userid: result[0].userid,
                type: result[0].type
            }

            console.log(payload)
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
            return res.status(200).json({
                token,
                ...result[0]
            });
        } else {
            return res.sendStatus(404);
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }

    // Check if the user is in database
    // Insert the category
})

module.exports = router;