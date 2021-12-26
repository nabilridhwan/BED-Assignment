const express = require('express');
const router = express.Router();

const Product = require("../models/product");
const Reviews = require("../models/review");
const path = require("path");

const multer = require('multer');
const ProductImages = require('../models/ProductImages');
const Cloudinary = require('../utils/cloudinary');

const upload = multer({
    storage: multer.memoryStorage(),
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
            console.log(err)
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
            if (err.errno == -1) {
                res.sendStatus(404);
            } else {
                res.sendStatus(500);
            }
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
            if (err.errno == 1452) {
                res.sendStatus(404);
            } else {
                res.sendStatus(500);
            }
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
            if (data.length > 0) {
                res.status(200).json(data);
            } else {
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
            if (err.message == "File too large") err.message += ". The limit is 1MB";
            if (err.message == "Unexpected field") err.message = "product_images field not found or there is a maximum limit of 5 images per product"
            return res.status(500).send(err.message);
        } else {

            const files = req.files;

            // Check if there are files, otherwise return an error
            if (!files) {
                return res.status(400).send("There is/are no image(s) provided.")
            }

            ProductImages.getPublicId(req.params.productId, (err, data) => {
                if (err) {
                    return res.status(500).send(err);
                }

                if (data.length > 0) {
                    // There are public ids for the product, so we need to delete them
                    const arrayOfPublicIds = data.map(image => image.public_id);
                    arrayOfPublicIds.forEach(async (public_id) => {
                        try {
                            let data = await Cloudinary.deleteFileFromCloudinary(public_id);

                            if (data.result == "ok") {
                                console.log("Deleted image from cloudinary")
                            } else {
                                console.log("Could not delete image from cloudinary")
                            }
                        } catch (error) {
                            return res.status(500).send(error)
                        }

                    })
                }

                ProductImages.deleteImagesByProductId(req.params.productId, (err, data) => {
                    if(err){
                        return res.status(500).send(err);
                    }

                    files.forEach(async (file, index) => {
                        // Try to upload file
                        try {
                            let data = await Cloudinary.uploadFileToCloudinary(file.buffer, "product_images");
                            const {
                                secure_url,
                                public_id
                            } = data
                            ProductImages.insertProductImage({
                                ...req.params,
                                url: secure_url,
                                public_id
                            }, (err, data) => {
                                if (err) {
                                    console.log(err)
                                    return res.sendStatus(500);
                                }
                            })
                        } catch (err) {
                            return res.status(500).send(err)
                        }

                        if(index == files.length - 1){
                            return res.sendStatus(204);
                        }
                    })
                })
            })
        }
    })
})

router.get("/:productId/image", (req, res) => {
    ProductImages.getImageByProductId({
        ...req.params
    }, (err, data) => {
        if (err) {
            res.status(500);
        } else {

            if (data.length > 0) {
                res.status(200)
                res.json(data.map(data => data.url))
            } else {
                res.sendStatus(404);
            }

        }
    })
})

module.exports = router;