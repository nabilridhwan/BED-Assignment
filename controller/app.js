const express = require('express');
const app = express();
const path = require('path');

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

app.use("/", usersRoute);
app.use("/category", categoriesRoute);
app.use("/discount", discountsRoute);
app.use("/interest", interestRoute);
app.use("/product", productsRoute);

// app.get("/images/:imageId", (req, res) => {
//     Images.getImage({...req.params}, (err, data) => {
//         if(err){
//             res.sendStatus(500);
//         }else{
//             if(data.length === 0){
//                 res.sendStatus(404);
//             }else{
//                 res.status(200).json(data);
//             }
//         }
//     })
// })

module.exports = app;