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
    // Get all discounts
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
    // Get all discount dates
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
    // Insert discount dates
    DiscountDates.insertDiscountDate({
        ...req.body
    }, (err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(201);
            // Send back the discount_date_id
            res.json({
                "discount_date_id": data.insertId
            });
        }
    })
})

router.get("/amount", (req, res) => {

    // Get all discount amounts
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
    // Insert discount amount
    DiscountAmount.insertDiscountAmount({
        ...req.body
    }, (err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(201);
            // Send back the discount_amount_id
            res.json({
                "discount_amount_id": data
            });
        }
    })
})

router.post("/", (req, res) => {
    // Insert discount
    Discount.insertDiscount({
        ...req.body
    }, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        } else {
            // Send back the discount_id
            res.status(201).json({
                discount_id: data.insertId
            })
        }
    })
})

router.delete("/:discount_id", (req, res) => {
    // Delete discount
    Discount.deleteDiscount(req.params, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        } else {
            // If the affected rows is 0, meaning that no discount is deleted (because it isn't found), send a 404 status code
            if (data.affectedRows == 0) {
                return res.sendStatus(404);
            }
            res.sendStatus(204);
        }
    })
})

router.get("/:productid", (req, res) => {
    // Get discount by product id
    Discount.getDiscountForProduct({
        ...req.params
    }, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        } else {
            if (data.length > 0) {
                const d = data.map(discount => {
                    const {
                        discount_id,
                        productid,
                        name,
                        price,
                        discount_amt,
                        discount_type,
                        from,
                        to,
                        categoryid,
                        category
                    } = discount;

                    // Check if the current date is after from and before to
                    const currentDate = new Date();
                    const fromDate = new Date(from);
                    const toDate = new Date(to);

                    if (currentDate >= fromDate && currentDate <= toDate) {
                        console.log("Within date")
                        if (discount_type == "%") {
                            const dOff = price * (discount_amt / 100);
                            discount.price = price - dOff;
                        } else {
                            discount.price -= discount_amt;
                        }


                        return discount;
                    }

                })

                return res.json(d.filter(d => d));

            } else {
                res.json([]);
            }
        }
    })
})



module.exports = router;