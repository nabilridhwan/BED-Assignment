const express = require('express');
const  app = express();
const multer = require('multer');
const path = require('path');
const Users = require('../models/users.js');
const Category = require("../models/category");
const Product = require("../models/product");
const Reviews = require("../models/review");
const Interest = require("../models/interest");
const Discount = require("../models/discounts")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/'))
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filetype = file.mimetype.split('/')[1];
        cb(null, file.originalname + '-' + uniqueSuffix + "." + filetype)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        } else {
            cb(new Error("Not a jpeg or png file"));
        }
    }
}).single('file')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Endpoint 1: POST users 
app.post("/users", (req, res) => {
    Users.insertUser(req.body, (err, data) => {
        if (err) {

            console.log(err)
            const errorNumber = err.errno;
            if (errorNumber === 1062) {

                res.sendStatus(422);
            } else {
                res.sendStatus(500);
            }
        } else {
            h.response(req, res, 201, {
                userid: data.insertId
            });
        }
    })
})

// Endpoint 2: GET /users
app.get("/users", (req, res) => {
    Users.getAllUsers((err, users) => {
        if (err) {
            res.sendStatus(500);


        } else {
            res.status(200).json(users);
        }
    })
})

// Endpoint 3: GET /users/:id
app.get("/users/:id", (req, res) => {
    Users.getUser({
        id: req.params.id
    }, (err, users) => {
        if (err) {
            res.sendStatus(500);

        } else {
            res.status(200).json(users);
        }
    })
})


// Endpoint 4: PUT /users/:id
app.put("/users/:id", (req, res) => {
    Users.updateUser({
        id: req.params.id,
        ...req.body
    }, (err, data) => {
        if (err) {
            if (err.errno === 1062) {
                res.sendStatus(422);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(204);
        }
    })
})

// Endpoint 5: POST /category
app.post("/category", (req, res) => {
    Category.insertCategory(req.body, (err, data) => {
        if (err) {
            if (err.errno == 1062) {
                h.knownError(req, res, 422, "The new category name provided already exists")
            } else {
                res.sendStatus(500);
            }

        } else {
            res.sendStatus(204);
        }
    })
})

// Endpoint 6: GET /category
app.get("/category", (req, res) => {
    Category.getAllCategories((err, categories) => {
        if (err) {
            res.sendStatus(500);
        } else {
            h.response(req, res, 200, categories);

        }
    })
})

// Endpoint 7: POST /product
app.post("/product", (req, res) => {

    Product.insertProduct(req.body, (err, data) => {
        if (err) {
            res.sendStatus(500);

        } else {
            h.response(req, res, 201, {
                "productid": data.insertId
            });
        }
    })
})

// Endpoint 8: GET /product/:id
app.get("/product/:id", (req, res) => {
    Product.getProduct({
        id: req.params.id
    }, (err, product) => {
        if (err) {
            res.sendStatus(500);
        } else {
            h.response(req, res, 200, product);
        }
    })
})
// Endpoint 9: DELETE /product/:id
app.delete("/product/:id", (req, res) => {
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
app.post("/product/:id/review", (req, res) => {
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
app.get("/product/:id/reviews", (req, res) => {
    Product.getReviewsForProduct({
        ...req.params
    }, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);

        } else {
            res.status(200).json(data);
        }
    })
})

// Endpoint 12: POST /interest/:userid
app.post("/interest/:userid", (req, res) => {
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
app.get("/interest", (req, res) => {
    Interest.getAllInterests((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(data);
        }
    })
})

app.get("/interest/:userid", (req, res) => {
    Interest.getInterestsById({
        ...req.params
    }, (err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(data);
        }
    })
})

// Get all products
app.get("/product", (req, res) => {
    Product.getAllProducts((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(data);
        }
    })
})

// File upload endpoints
app.post("/upload", (req, res) => {
    upload(req, res, function(err){
        if(err){
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    })
})


// Discount endpoints
app.get("/discount", (req, res) => {
    Discount.getAllDiscounts((err, data) => {
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200);
            res.json(data);
        }
    })
})

app.post("/discount", (req, res) => {
    Discount.insertDiscount(req.body, (err, data) => {
        if(err){
            console.log(err)
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    })
})

app.delete("/discount/:discount_id", (req, res) => {
    Discount.deleteDiscount(req.params, (err, data) => {
        if(err){
            console.log(err)
            res.sendStatus(500);
        }else{
            res.sendStatus(204);
        }
    })
})

module.exports = app;