const bcrypt = require("bcryptjs");

function generateHash(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 8)
            .then(hash => {
                resolve(hash);
            }).catch(e => {
                reject(e);
            })
    })
}

function verifyPassword(password, hash) {
    return new Promise((resolve, reject) => {

        bcrypt.compare(password, hash)

            .then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            })
    })
}

module.exports = {
    generateHash,
    verifyPassword
}