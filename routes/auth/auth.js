const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  signup,
  signin,
  isSignedIn,
  verifyUser,
  isAdmin,
} = require("../../controllers/auth/auth");

//SIGNUP
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

//SIGNIN
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

//VERIFYING USER BY ADMIN
router.post(
  "/user/verify",
  [
    check("id", "No id found in the request")
      .isLength({ min: 1, max: 1000 })
      .isNumeric(),
  ],
  isSignedIn,
  isAdmin,
  verifyUser
);

module.exports = router;
