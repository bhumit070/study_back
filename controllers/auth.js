const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const connection = require("../db");
const jwt = require("jsonwebtoken");

const secret = Buffer.from(process.env.SECRET).toString("base64");

exports.signup = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        isError: true,
        message: errors.array()[0].msg,
      });
    }
    let { name, email, password } = req.body;

    const findUserQuery = `select * from tbl_user where user_email='${email}'`;
    connection.db().query(findUserQuery, (error, result, fields) => {
      if (result.length > 0) {
        return res.json({
          isError: true,
          message: "Email already exist in the database",
        });
      }
    });
    password = bcrypt.hashSync(password, 10);
    console.log();
    debugger;
    const registerUserQuery = `insert into tbl_user (user_name,user_email,user_password,created_at) VALUES ('${name}','${email}','${password}',CURRENT_TIMESTAMP())`;
    connection.db().query(registerUserQuery, (error) => {
      if (error) {
        return res.json({
          isError: true,
          message: "Unable to Signup",
          error: error,
        });
      }
      return res.json({
        isError: false,
        message: "Signup Successful",
      });
    });
  } catch (error) {
    return res.json({
      isError: true,
      message: "Unable to Signup",
      error: error,
    });
  }
};

exports.signin = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        isError: true,
        message: errors.array()[0].msg,
      });
    }
    const { email, password } = req.body;
    const query = `select * from tbl_user where user_email='${email}'`;
    connection.db().query(query, (error, result) => {
      if (error || result.length == 0) {
        return res.json({
          isError: true,
          message: "No user foun with given email",
          error: error,
        });
      } else if (!bcrypt.compareSync(password, result[0].user_password)) {
        return res.json({
          isError: true,
          message: "Password Is incorrect",
          error: error,
        });
      }
      const token = jwt.sign({ id: result[0].user_id }, secret, {
        algorithm: "HS256",
      });
      return res.json({
        isError: false,
        message: "Signin Successful",
        token,
      });
    });
  } catch (error) {
    return res.json({
      isError: true,
      message: "Unable to signin",
      error: error,
    });
  }
};
