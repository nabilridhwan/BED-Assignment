/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// Routes
const usersRoute = require('./users.js');
const categoriesRoute = require('./categories.js');
const discountsRoute = require('./discounts.js');
const interestRoute = require('./interests.js');
const productsRoute = require('./products.js');
const authRoute = require("./auth.js");
const cartRoute = require("./cart.js");

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too much request from this IP, please try again later"
// });

// General configurations for express applications
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Use the rate limited
// app.use(limiter);

// Use cors
app.use(cors())
app.use(helmet())
app.use(morgan())


app.use("/", usersRoute);
app.use("/category", categoriesRoute);
app.use("/discount", discountsRoute);
app.use("/interest", interestRoute);
app.use("/product", productsRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute)

module.exports = app;