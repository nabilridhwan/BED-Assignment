/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const db = require('../config/db');

const Product = {

    insertProduct: ({
        name,
        description,
        categoryid,
        brand,
        price
    }) => {

        name = name || null;
        description = description || null;
        categoryid = categoryid || null;
        brand = brand || null;
        price = price || null;

        return new Promise((resolve, reject) => {
            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "INSERT INTO products(name, description, categoryid, brand, price) VALUES(?, ?, ?, ?, ?)"
                    dbConn.query(sql, [name, description, categoryid, brand, price], (err, result) => {
                        dbConn.end()

                        if (err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }

                    })
                }
            })
        })
    },

    getAllProducts: () => {

        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection()
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "SELECT p.productid, p.name, p.description, p.categoryid, c.category as categoryname, p.brand, p.price FROM products p, category c WHERE p.categoryid = c.categoryid"

                    dbConn.query(sql, [], (err, result) => {
                        dbConn.end()

                        if (err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }

                    })
                }
            })
        })
    },

    editProduct(productid, {
        name,
        description,
        categoryid,
        brand,
        price
    }) {

        name = name || null;
        description = description || null;
        categoryid = categoryid || null;
        brand = brand || null;
        price = price || null;

        return new Promise((resolve, reject) => {
            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "UPDATE products SET name = ?, description = ?, categoryid = ?, brand = ?, price = ? WHERE productid = ?"
                    dbConn.query(sql, [name, description, categoryid, brand, price, productid], (err, result) => {
                        dbConn.end()

                        if (err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }

                    })
                }
            })
        })

    },

    getProduct: ({
        id
    }) => {

        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "SELECT p.name, p.description, p.categoryid, c.category as categoryname, p.brand, p.price FROM products p, category c WHERE p.categoryid = c.categoryid AND p.productid = ?;"
                    dbConn.query(sql, [id], (err, result) => {
                        dbConn.end()

                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }

                    })
                }
            })


        })
    },

    deleteProduct: ({
        id
    }) => {
        id = id || null;
        return new Promise((resolve, reject) => {
            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "DELETE FROM products WHERE productid = ?"
                    dbConn.query(sql, [id], (err, result) => {
                        dbConn.end()
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                }
            })
        })
    },

    getReviewsForProduct: ({
        id
    }) => {
        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err)
                } else {
                    const sql = "SELECT p.productid, u.userid, u.username, r.rating, r.review, r.created_at FROM products p, reviews r, users u WHERE p.productid = r.productid AND r.userid = u.userid AND r.productid = ?;"
                    dbConn.query(sql, [id], (err, result) => {
                        dbConn.end()

                        if (err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }

                    })
                }
            })
        })
    },

    find(searchQuery, columnName) {
        searchQuery = searchQuery || null;
        return new Promise((resolve, reject) => {

            if (!searchQuery) reject("Search query is empty")

            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = `SELECT p.productid, p.name, p.description, p.categoryid, c.category as categoryname, p.brand, p.price FROM products p, category c WHERE p.categoryid = c.categoryid AND p.${columnName} LIKE '%${searchQuery}%'`
                    dbConn.query(sql, [columnName], (err, result) => {
                        dbConn.end()

                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }

                    })
                }
            })
        })
    },

    getAllProductsByCategoryId: (id) => {
        id = id || null;
        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = `SELECT p.productid, p.name, p.description, p.categoryid, c.category as categoryname, p.brand, p.price FROM products p, category c WHERE p.categoryid = c.categoryid AND p.categoryid = ?`
                    dbConn.query(sql, [id], (err, result) => {
                        dbConn.end()

                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }

                    })
                }
            })
        })
    }

}

module.exports = Product;