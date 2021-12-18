const express = require('express');
const router = express.Router();

const Product = require("../models/product");
const Reviews = require("../models/review");
const Images = require("../models/images");
const path = require("path");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"));
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filetype = file.mimetype.split('/')[1];
        cb(null, uniqueSuffix + "." + filetype)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error("The file is not a jpeg, jpg or png file"));
        }
    }
}).array('product_images', 5)

// Get all products
router.get("/", (req, res) => {
    Product.getAllProducts((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(data);
        }
    })
})

// Endpoint 7: POST /product
router.post("/", (req, res) => {

    Product.insertProduct(req.body, (err, data) => {
        if (err) {
            res.sendStatus(500);

        } else {
            res.status(201).json({
                "productid": data.insertId
            })
        }
    })
})

// Endpoint 8: GET /product/:id
router.get("/:id", (req, res) => {
    Product.getProduct({
        id: req.params.id
    }, (err, product) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(product);
        }
    })
})
// Endpoint 9: DELETE /product/:id
router.delete("/:id", (req, res) => {
    Product.deleteProduct({
        id: req.params.id
    }, (err, product) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    })
})

// Endpoint 10: POST /product/:id/review/
router.post("/:id/review", (req, res) => {
    Reviews.insertReview({
        productid: req.params.id,
        ...req.body
    }, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);

        } else {
            res.status(200).json({
                "reviewid": data.insertId
            })
        }
    })
})

// Endpoint 11: GET /product/:id/reviews
router.get("/:id/reviews", (req, res) => {
    Product.getReviewsForProduct({
        ...req.params
    }, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        } else {
            if(data.length > 0){
                res.status(200).json(data);
            }else{
                res.sendStatus(404);
            }
        }
    })
})

// Upload an image for a specific product
router.post("/:productId/image", (req, res) => {
    // Insert the page
    upload(req, res, function (err) {

        // Error handling for 
        if (err) {
            if(err.message == "File too large") err.message += ". The limit is 1MB";
            if(err.message == "Unexpected field") err.message = "There is a maximum limit of 5 images per product"
            return res.status(500).send(err.message);
        } else {

            const files = req.files;

            Images.insertProductImages({
                ...req.params,
                fileObject: files
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    return res.sendStatus(204);
                }
            })
        }
    })
})

router.get("/:productId/image", (req, res) => {
    Images.getImageByProductId({
        ...req.params
    }, (err, data) => {
        if (err) {
            res.status(500);
        } else {

            if (data.length > 0) {
                res.status(200)
                res.json(data.map(data => data.filename))
            } else {
                res.sendStatus(404);
            }

        }
    })
})

module.exports = router;