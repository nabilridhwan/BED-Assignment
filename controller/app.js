const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors')

const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too much request from this IP, please try again later"
});


const usersRoute = require('./users.js');
const categoriesRoute = require('./categories.js');
const discountsRoute = require('./discounts.js');
const interestRoute = require('./interests.js');
const productsRoute = require('./products.js');

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(limiter);
app.use(cors())

app.use("/", usersRoute);
app.use("/category", categoriesRoute);
app.use("/discount", discountsRoute);
app.use("/interest", interestRoute);
app.use("/product", productsRoute);

module.exports = app;