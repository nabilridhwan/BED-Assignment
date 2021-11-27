const express = require('express');
const app = express();

const userDB = require('../models/users.js');
const Category = require("../models/category");

// Endpoint 2: GET /users
app.get("/users", (req, res) => {
    userDB.getAllUsers((err, users) => {
        if(err){
            res.status(500).send("Unknown error");

        }else{
            res.status(200).send(users);
        }
    })
})

// Endpoint 3: GET /users/:id
app.get("/users/:id", (req, res) => {
    let {id} = req.params;
    userDB.getUser(id, (err, users) => {
        if(err){
            res.status(500).send("Unknown error");
        }else{
            res.status(200).send(users);
        }
    })
})

// Endpoint 1: POST users 
app.post("/users", (req, res) => {
    let {
        userid,
        email,
        contact,
        password,
        type,
        profile_pic_url,
        username
    } = req.body;

    userDB.insertUser(userid,email, contact, password, type, profile_pic_url, username, (err, data) => {
        if (err) {
            const errorNumber = err.errno;
            if(errorNumber === 1062){
                return res.status(422).send("The new username OR new email provided already exists.");
            }else{
                return res.status(500).send("Unknown error");
            }
        } else {
            return res.status(201).send(data);
        }
    })
})

app.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const {
        email,
        contact,
        password,
        type,
        profile_pic_url,
        username
    } = req.body;


    // TODO: ERR_HTTP_HEADERS_SENT
    userDB.updateUser(id, email, contact, password, type, profile_pic_url, username, (err, data) => {
        if(err){
            if(err.errno === 1062){
                return res.status(422).end("The new username OR new email provided already exists.");
            }else{
                return res.status(500).end("Unknown error");
            }
        }else{
            return res.sendStatus(204);
        }
    })
})

app.post("/category", (req, res) => {
    const {category_name, category_description} = req.body;

    Category.insertCategory(category_name, category_description, (err, data) => {
        if(err){
            if(err.errno === 1062){
                return res.sendStatus(422);
            }else{
                return res.status(500).end("Unknown error");
            }
        }else{
            return res.sendStatus(204);
        }
    })
})


module.exports = app;