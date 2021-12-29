const app = require("./controller/app")

// Environment variables configuration
require("dotenv").config();

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
})