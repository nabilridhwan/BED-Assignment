const app = require("./controller/app")

// Environment variables configuration
require("dotenv").config();

if(!process.env.PORT || !process.env.HOST){
    throw new Error("PORT and HOST environment variables are required. Check README.md configuration for more information!");
}

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
})