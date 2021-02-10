const mysql = require("mysql");

exports.db = () => {
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
      }
    });
    return connection;
  } catch (error) {
    console.log(error);
  }
};
