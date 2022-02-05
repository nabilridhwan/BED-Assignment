/*
  Name: Nabil Ridhwanshah Bin Rosli
  Class: DIT/FT/1B/05
  Group: None (Solo)
  Admin No: P2007421
*/

const db = require('../config/db');

const Category = {
    getAllCategories: () => {

        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err)
                } else {
                    const sql = "SELECT * FROM category"
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

    insertCategory: ({
        category,
        description
    }) => {

        category = category || null;
        description = description || null;

        return new Promise((resolve, reject) => {

            var dbConn = db.getConnection();
            dbConn.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    const sql = "INSERT INTO category(category, description) VALUES(?,?)"
                    dbConn.query(sql, [category, description], (err, result) => {
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

    searchCategoryByName: (category) => {
            
            return new Promise((resolve, reject) => {
    
                var dbConn = db.getConnection();
                dbConn.connect(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        const sql = `SELECT * FROM category WHERE category LIKE "%${category}%"`
                        dbConn.query(sql, [category], (err, result) => {
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
    }

}

module.exports = Category;