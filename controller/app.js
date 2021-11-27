const express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Users = require('../models/users.js');
const Category = require("../models/category");
const Product = require("../models/product");
const Reviews = require("../models/review");

const ResponseHandler = require("../ErrorHandler");

const h = new ResponseHandler();

// Endpoint 1: POST users 
app.post("/users", (req, res) => {
    Users.insertUser(req.body, (err, data) => {
        if (err) {

            console.log(err)
            const errorNumber = err.errno;
            if (errorNumber === 1062) {

                h.knownError(req, res, 422, "The new username OR new email provided already exists.")
            } else {
                h.unknownError(req,res);
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
            h.unknownError(req, res);


        } else {
            h.response(req, res, 200, users);
        }
    })
})

// Endpoint 3: GET /users/:id
app.get("/users/:id", (req, res) => {
    Users.getUser({id: req.params.id}, (err, users) => {
        if (err) {
            h.unknownError(req, res);

        } else {
            h.response(req, res, 200, users);
        }
    })
})


// Endpoint 4: PUT /users/:id
app.put("/users/:id", (req, res) => {
    Users.updateUser({id: req.params.id, ...req.body}, (err, data) => {
        if (err) {
            if (err.errno === 1062) {
                h.knownError(req, res, 422, "The new username OR new email provided already exists.")
            } else {
                h.unknownError(req, res);
            }
        } else {
            h.response(req, res, 204, {});
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
                h.unknownError(req, res);
            }

        } else {
            h.response(req, res, 204, {});
        }
    })
})

// Endpoint 6: GET /category
app.get("/category", (req, res) => {
    Category.getAllCategories((err, categories) => {
        if (err) {
            h.unknownError(req, res);
        } else {
            h.response(req, res, 200, categories);

        }
    })
})

// Endpoint 7: POST /product
app.post("/product", (req, res) => {

    Product.insertProduct(req.body, (err, data) => {
        if (err) {
            h.unknownError(req, res);

        } else {
            h.response(req, res, 201, {
                "productid": data.insertId
            });
        }
    })
})

// Endpoint 8: GET /product/:id
app.get("/product/:id", (req, res) => {
    Product.getProduct({id: req.params.id}, (err, product) => {
        if(err){
            h.unknownError(req, res);
        }else{
            h.response(req, res, 200, product);
        }
    })
})
// Endpoint 9: DELETE /product/:id
app.delete("/product/:id", (req, res) => {
    Product.deleteProduct({id: req.params.id}, (err, product) => {
        if(err){
            console.log(err)
            h.unknownError(req, res);
        }else{
            h.response(req, res, 204, {});
        }
    })
})

// Endpoint 11: GET /product/:id/reviews
app.get("/product/:id/reviews", (req, res) => {
    Product.getReviewsForProduct({...req.params}, (err, data) => {
        if (err) {
            console.log(err)
            h.unknownError(req, res);

        } else {
            h.response(req, res, 200, data);
        }
    })
})


module.exports = app;