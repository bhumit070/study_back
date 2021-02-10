const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { signup, signin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "Please Enter Valid Name").isLength({ min: 2 }),
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Please Enter Password with 6 Characters").isLength({
      min: 6,
    }),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Please Enter Password with 6 Characters").isLength({
      min: 6,
    }),
  ],
  signin
);

module.exports = router;
