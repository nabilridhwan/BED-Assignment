/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const express = require('express');
const router = express.Router();

const Interest = require("../models/interest");

router.post("/:userid", (req, res) => {

    if(isNaN(req.params.userid)){
        return res.status(400).send("The User ID provided must be a number")
    }
    
    Interest.insertInterests({
        ...req.params,
        ...req.body
    }, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);

        } else {
            res.sendStatus(201);
        }
    })
})

// Extra endpoints
router.get("/", (req, res) => {
    Interest.getAllInterests((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(data);
        }
    })
})

router.get("/:userid", (req, res) => {

    if(isNaN(req.params.userid)){
        return res.status(400).send("The User ID provided must be a number")
    }
    
    Interest.getInterestsById({
        ...req.params
    }, (err, data) => {
        if (err) {
            return res.sendStatus(500);
        } else {
            if(data.length == 0){
                return res.sendStatus(404);
            }
            return res.status(200).json(data);
        }
    })
})

module.exports = router;