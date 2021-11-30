const express = require('express');
const router = express.Router();

const Discount = require("../models/discounts");

// Discount endpoints
router.get("/", (req, res) => {
    Discount.getAllDiscounts((err, data) => {
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200);
            res.json(data);
        }
    })
})

router.post("/", (req, res) => {
    Discount.insertDiscount(req.body, (err, data) => {
        if(err){
            console.log(err)
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    })
})

router.delete("/:discount_id", (req, res) => {
    Discount.deleteDiscount(req.params, (err, data) => {
        if(err){
            console.log(err)
            res.sendStatus(500);
        }else{
            res.sendStatus(204);
        }
    })
})

module.exports = router;