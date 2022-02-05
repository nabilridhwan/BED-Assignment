/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const express = require('express');
const isUserLoggedIn = require('../auth/isUserLoggedIn');
const Cart = require('../models/cart');
const router = express.Router();

router.get("/", isUserLoggedIn, async (req, res) => {
    if (!req.userid) {
        return res.sendStatus(403);
    }

    try {
        const result = await Cart.getPurchases(req.userid)
        return res.json(result)
    } catch (e) {
        return res.status(500).send(e)
    }

})

// Endpoint 7: POST /cart
router.post("/", isUserLoggedIn, async (req, res) => {

    if (!req.userid) {
        return res.sendStatus(403);
    }

    if (!req.body.productid || !req.body.price) {
        return res.sendStatus(400);
    }

    try {
        // Insert the product
        let insert = await Cart.insertItem({
            ...req.body,
            userid: req.userid
        });

        return res.status(201).json({
            "cartid": insert.insertId
        })
    } catch (err) {
        console.log(err)
        if (err.errno == 1048) {
            return res.sendStatus(400);
        }

        return res.status(500).send(err);
    }

})


module.exports = router;