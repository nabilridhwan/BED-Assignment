/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const express = require('express');
const router = express.Router();

const Product = require("../models/product");
const Reviews = require("../models/review");
const path = require("path");

const multer = require('multer');
const ProductImages = require('../models/ProductImages');

// Require cloudinary
const Cloudinary = require('../utils/cloudinary');
const isUserLoggedIn = require('../auth/isUserLoggedIn');

// Storage uses memoryStorage
// Limits of fileSize 1MB
// Fields: 1
// Field name: product_images
// Maximal number of files: 5
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        // Check the file type
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error("One or more files provided are not a jpeg, jpg or png file"));
        }
    }
}).array('product_images', 5)

// Get all products
router.get("/", async (req, res) => {

    if (req.query.name) {
        try {
            // Search by name
            const products = await Product.find(req.query.name, "name")
            return res.status(200).json(products)
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    }

    if (req.query.brand) {
        try {
            // Search by name
            const products = await Product.find(req.query.brand, "brand")
            return res.status(200).json(products)
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    }

    try {
        // Get all products
        let products = await Product.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

})

// Endpoint 7: POST /product
router.post("/", async (req, res) => {

    try {
        // Insert the product
        let insert = await Product.insertProduct(req.body);

        return res.status(201).json({
            "productid": insert.insertId
        })
    } catch (err) {
        console.log(err)
        if (err.errno == 1062) {
            return res.status(422).send("The product name provided already exists");
        }
        return res.status(500).send(err);
    }

})

// Endpoint 8: GET /product/:id
router.get("/:id", async (req, res) => {

    // Check if id is a number, otherwise send a 400 status code
    if (isNaN(req.params.id)) {
        return res.status(400).send("The Product ID provided must be a number")
    }

    // Get product by ID
    try {
        let product = await Product.getProduct({
            id: req.params.id
        });
        return res.status(200).json(product);
    } catch (e) {
        console.log(e)
        return res.status(500).send(e);
    }

})
// Endpoint 9: DELETE /product/:id
router.delete("/:id", isUserLoggedIn, async (req, res) => {

    // Check if id is a number, otherwise send a 400 status code
    if (isNaN(req.params.id)) {
        return res.status(400).send("The Product ID provided must be a number")
    }

    if (req.role !== "Admin") {
        return res.sendStatus(403);
    }


    try {
        await Product.deleteProduct({
            id: req.params.id
        });
        return res.sendStatus(200);
    } catch (e) {
        console.log(e)
        return res.status(500).send(e);
    }
})

// Endpoint 10: POST /product/:id/review/
router.post("/:id/review", isUserLoggedIn, async (req, res) => {

    // Check if id is a number, otherwise send a 400 status code
    if (isNaN(req.params.id)) {
        return res.status(400).send("The Product ID provided must be a number")
    }

    // If user is not signed in, return a 403
    if (!req.token) {
        return res.sendStatus(403);
    }

    // Insert the review
    try {

        let result = await Reviews.insertReview({
            productid: req.params.id,
            ...req.body,
            userid: req.userid
        })

        return res.json({
            reviewid: result.insertId
        })

    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
})

// Endpoint 11: GET /product/:id/reviews
router.get("/:id/review", async (req, res) => {

    // Check if id is a number, otherwise send a 400 status code
    if (isNaN(req.params.id)) {
        return res.status(400).send("The Product ID provided must be a number")
    }

    try {
        let reviews = await Product.getReviewsForProduct({
            ...req.params
        }); // Get reviews for product

        return res.send(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }

})

// Upload an image for a specific product
router.post("/:productId/image", async (req, res) => {

    console.log(req.params.productId)

    // Check if id is a number, otherwise send a 400 status code
    if (isNaN(req.params.productId)) {
        return res.status(400).send("The Product ID provided must be a number")
    }

    const getProduct = await Product.getProduct({
        id: req.params.productId
    })

    if (getProduct.length == 0) {
        return res.sendStatus(404);
    }

    // Insert the page
    upload(req, res, async function (err) {
        // Error handling!
        if (err) {

            if (err.message == "File too large") {
                return res.sendStatus(422);
            }
            if (err.message == "Unexpected field") {
                err.message = "'product_images' field not found OR there is a maximum limit of 5 images per product"
            }

            if (err.message == "One or more files provided are not a jpeg, jpg or png file") {
                return res.sendStatus(415)
            }

            console.log(err)
            return res.status(500).send(err.message);
        } else {

            // Files array
            const files = req.files;

            // Check if there are files, otherwise return an error
            if (!files || files.length == 0) {
                return res.status(400).send("There is/are no image(s) provided.")
            }


            try {

                // Get all the public ids and delete it
                const imagePublicIds = await ProductImages.getPublicId(req.params.productId)
                imagePublicIds.map(image => image.public_id).forEach(async (public_id) => {
                    try {
                        // Delete the image from cloudinary
                        await Cloudinary.deleteFileFromCloudinary(public_id);
                    } catch (error) {
                        // If there is an error, send a 500 status code
                        console.log(error)
                        return res.status(500).send(error)
                    }
                })

                // After deleting the images from cloudinary, we can insert the new ones
                // Start off by deleting all the images (in the database) by product id
                await ProductImages.deleteImagesByProductId(req.params.productId)

                try {

                    // allImageUploaded is an array of promises
                    // Upload all the images
                    let allImagesUploaded = files.map(async file => {
                        return await Cloudinary.uploadFileToCloudinary(file.buffer, "product_images");
                    })

                    // Await for all the promise to be resolved
                    let imagesResponse = await Promise.all(allImagesUploaded);

                    // Insert the images into the database
                    try {
                        await ProductImages.insertProductImages({
                            ...req.params,
                            fileObjectArray: imagesResponse
                        })

                        return res.sendStatus(204);
                    } catch (error) {
                        console.log(error)
                        return res.status(500).send(error)
                    }


                } catch (err) {
                    console.log(err)
                    return res.status(500).send(err)
                }


            } catch (e) { // Catch for publicIds
                console.log(e)
                return res.status(500).send(e)
            }


        }
    })
})

// Get all the images for a specific product
router.get("/:productId/image", async (req, res) => {

    // Check if id is a number, otherwise send a 400 status code
    if (isNaN(req.params.productId)) {
        return res.status(400).send("The Product ID provided must be a number")
    }

    try {
        // Get all the images by product id
        const images = await ProductImages.getImageByProductId({
            ...req.params
        })

        if (images.length > 0) {
            return res.status(200).json(images.map(image => image.url))
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }

})

module.exports = router;