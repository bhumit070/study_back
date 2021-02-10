const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const connection = require("../db");
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  console.log();
  if (!errors.isEmpty()) {
    return res.json({
      isError: true,
      message: errors.array()[0].msg,
    });
  }
  let { name, email, password } = req.body;
  password = bcrypt.hashSync(password, 10);
  console.log();
  debugger;
  connection
    .db()
    .query(
      `insert into tbl_user (user_name,user_email,user_password,created_at) VALUES ('${name}','${email}','${password}',CURRENT_TIMESTAMP())`,
      (error, results, fields) => {
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
          fields,
        });
      }
    );
};
