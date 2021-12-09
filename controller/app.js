const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors')

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

app.use(cors())

app.use("/", usersRoute);
app.use("/category", categoriesRoute);
app.use("/discount", discountsRoute);
app.use("/interest", interestRoute);
app.use("/product", productsRoute);

module.exports = app;