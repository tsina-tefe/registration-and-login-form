require("dotenv").config({ path: "../.env" });
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//Create database
/*
db.connect((err) => {
    if(err) {
        console.log("Connection Error: ", err);
        process.exit(1);
    }
    console.log("Connected to database");

    db.query("CREATE DATABASE IF NOT EXISTS wabians", (err) => {
        if(err) {
            console.log("Error Creating database: ", err);
            process.exit(1);
        }
        console.log("Created database");
    });
});
*/

db.connect((err) => {
  if (err) {
    console.log("connection error: ", err);
    process.exit(1);
  }
  console.log("Conneted successfully");

  const createTable = `
        CREATE TABLE IF NOT EXISTS wabiOne (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL)
    `;

  db.query(createTable, (err) => {
    if (err) {
      console.log("Couldn't create table: ", err);
      return res
        .status(500)
        .json({ message: "Something went wrong, try again later" });
    }
    console.log("Created table");
  });
});

module.exports = db;
