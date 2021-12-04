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
            if (data) {
                res.status(200);
                res.send(data);
            } else {
                res.sendStatus(404);

            }
        }
    })
})

router.post("/dates", (req, res) => {
    DiscountDates.insertDiscountDate({...req.body},(err, data) => {
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
    DiscountAmount.getAllDiscountAmount((err,data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200);
            res.json(data);
        }
    })
})

router.post("/amount", (req, res) => {
    DiscountAmount.insertDiscountAmount({...req.body}, (err, data) => {
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
    Discount.insertDiscount({...req.body}, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
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

module.exports = router;