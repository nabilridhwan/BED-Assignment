const jwt = require("jsonwebtoken");

function isUserLoggedIn(req, res, next) {
    // Get bearer token from header
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader) {
        return res.sendStatus(403);
    }

    const [_, token] = bearerHeader.split(" ");

    if (token) {

        req.token = token;

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.userid = decoded.userid;
            req.type = decoded.type

            return next();
        })

    }

}

module.exports = isUserLoggedIn;