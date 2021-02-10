const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const connection = require("../db");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const secret = Buffer.from(process.env.SECRET).toString("base64");

exports.signup = async (req, res) => {
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
    connection.db().query(findUserQuery, (error, result) => {
      if (result.length > 0) {
        return res.json({
          isError: true,
          message: "Email already exist in the database",
        });
      } else {
        password = bcrypt.hashSync(password, 10);
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
      }
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
      } else if (!result[0].is_verified) {
        return res.json({
          isError: true,
          message: "Your account is not Verified",
          error: error,
        });
      }
      const token = jwt.sign(
        { id: result[0].user_id, role: result[0].is_admin },
        secret,
        {
          algorithm: "HS256",
        }
      );
      res.cookie("token", token, { expire: 360000 + Date.now() });
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

exports.isSignedIn = expressJwt({
  secret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.verifyUser = (req, res) => {
  console.log(req.auth);
  const { id } = req.body;
  const verifyUserQuery = `UPDATE tbl_user SET is_verified = '1' WHERE user_id = ${id}`;
  connection.db().query(verifyUserQuery, (error) => {
    if (error) {
      return res.json({
        isError: true,
        message: "Unalbe to verify User",
        error: error,
      });
    } else {
      return res.json({
        isError: false,
        message: "User Verified Successfully!",
        error: error,
      });
    }
  });
};

exports.isAuthenticated = (req, res, next) => {
  if (req.auth.role !== 1) {
    return res.json({
      isError: true,
      message: "You are not Allowed to perform this action",
    });
  }
  next();
};
