require("dotenv").config();
const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const mysql = require("mysql2");

var connection = mysql.createConnection({
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true
});
function connectDatabase() {

  return connection.connect((err) => {
    if (!err) {
      console.log("Database connected successfully");
    } else {
      console.log(
        "An error occured when attemptng to connect to the database",
        err
      );
    }
  });
}

module.exports = { connectDatabase, connection };
