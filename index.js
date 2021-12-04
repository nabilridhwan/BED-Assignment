const app = require("./controller/app")

const CONFIG = require("./config/host")

app.listen(CONFIG.PORT, CONFIG.HOST, () => {
    console.log(`Server running at http://${CONFIG.HOST}:${CONFIG.PORT}/`);
})