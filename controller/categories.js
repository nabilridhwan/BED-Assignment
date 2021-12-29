/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const express = require('express');
const router = express.Router();

const Category = require("../models/category");

// Endpoint 5: POST /category
router.post("/", (req, res) => {
    Category.insertCategory(req.body, (err, data) => {
        if (err) {
            if (err.errno == 1062) {
                res.status(422).send("The new category name provided already exists")
            } else {
                res.sendStatus(500);
            }

        } else {
            res.sendStatus(204);
        }
    })
})

// Endpoint 6: GET /category
router.get("/", (req, res) => {
    Category.getAllCategories((err, categories) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(categories);
        }
    })
})

module.exports = router;