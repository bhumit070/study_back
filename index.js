require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();

try {
  const connection = mysql.createConnection({
    host: "localhost1",
    user: "root",
    password: "incipient",
    database: "db_school",
  });
  connection.connect((error) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("DB CONNECTED");
    }
  });
  const port = 8081;
  app.listen(port, () => console.log(`App is Running @ ${port}`));
} catch (error) {
  console.log(error);
}
