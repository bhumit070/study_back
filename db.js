const mysql = require("mysql");

exports.db = () => {
  try {
    const connection = mysql.createConnection({
      host: process.env.host,
      user: process.env.USERDB,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
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
