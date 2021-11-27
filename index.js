const express = require('express');
const HOST = "localhost";
const PORT = 8080;
const app = require("./controller/app")

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
})