// DB/sql.js

const mysql = require("mysql");

const dbConfiguration = {
  host: "localhost",
  user: "root",
  password: "",
  database: "test1",
};

const pool = mysql.createPool(dbConfiguration);

// Helper function to execute queries
function executequery(query, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { pool, executequery };
