/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const express = require('express');
const router = express.Router();

const Discount = require("../models/discounts");
const DiscountAmount = require('../models/discount_amount');
const DiscountDates = require('../models/discount_dates');

// Discount endpoints
router.get("/", (req, res) => {
    Discount.getAllDiscounts((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200);
            res.json(data);
        }
    })
})

router.get("/dates", (req, res) => {
    DiscountDates.getAllDiscountDates((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200);
            res.send(data);
        }
    })
})

router.post("/dates", (req, res) => {
    DiscountDates.insertDiscountDate({
        ...req.body
    }, (err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200);
            res.json({
                "insertid": data
            });
        }
    })
})

router.get("/amount", (req, res) => {
    DiscountAmount.getAllDiscountAmount((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200);
            res.json(data);
        }
    })
})

router.post("/amount", (req, res) => {
    DiscountAmount.insertDiscountAmount({
        ...req.body
    }, (err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200);
            res.json({
                "insertid": data
            });
        }
    })
})

router.post("/", (req, res) => {
    Discount.insertDiscount({
        ...req.body
    }, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        } else {
            res.status(201).json({
                discount_id: data.insertId
            })
        }
    })
})

router.delete("/:discount_id", (req, res) => {
    Discount.deleteDiscount(req.params, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    })
})

router.get("/:productid", (req, res) => {
    Discount.getDiscountForProduct({
        ...req.params
    }, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        } else {
            if (data.length == 0) {
                return res.sendStatus(404)
            }
            return res.status(200).send(data)
        }
    })
})



module.exports = router;