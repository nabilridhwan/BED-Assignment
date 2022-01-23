/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const express = require('express');
const isUserLoggedIn = require('../auth/isUserLoggedIn');
const router = express.Router();

const Category = require("../models/category");

// Endpoint 5: POST /category
router.post("/", isUserLoggedIn, async (req, res) => {

    if (req.type !== "Admin") {
        return res.status(403).json({
            message: "You are not authorized to perform this action"
        })
    }

    try {

        // Insert the category
        await Category.insertCategory(req.body)

        return res.sendStatus(204);
    } catch (error) {
        console.log(error)
        if (error.errno == 1062) {
            return res.status(422).send("The new category name provided already exists")
        }

        return res.status(500).send(error)
    }
})

// Endpoint 6: GET /category
router.get("/", async (req, res) => {

    try {
        // Get all categories
        const categories = await Category.getAllCategories()
        return res.json(categories);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})

module.exports = router;