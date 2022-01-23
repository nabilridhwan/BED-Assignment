/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const express = require('express');
const isUserLoggedIn = require('../auth/isUserLoggedIn');
const router = express.Router();

const Interest = require("../models/interest");

router.post("/:userid", isUserLoggedIn, async (req, res) => {

    // Check if userid is a number
    if (isNaN(req.params.userid)) {
        // Otherwise, send a 400 status code
        return res.status(400).send("The User ID provided must be a number")
    }

    if (req.params.userid != req.userid) {
        return res.sendStatus(403);
    }

    try {
        // Clear all the interests
        await Interest.clearInterestByUserId(req.params.userid);

        // Insert the interest
        await Interest.insertInterests({
            ...req.params,
            ...req.body
        })

        return res.sendStatus(201);
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }


})

router.get("/", async (req, res) => {

    try {
        // Get all interests
        const interests = await Interest.getAllInterests();
        return res.send(interests)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

router.get("/:userid", async (req, res) => {
    // TODO: Verification of userid
    // Check if userid is a number, otherwise, send a 400 status code
    if (isNaN(req.params.userid)) {
        return res.status(400).send("The User ID provided must be a number")
    }

    // Get interest by ID

    try {
        const interests = await Interest.getInterestsById({
            ...req.params
        })
        return res.json(interests)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})

module.exports = router;