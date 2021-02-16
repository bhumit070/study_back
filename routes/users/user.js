const express = require("express");
const { isAdmin, isSignedIn } = require("../../controllers/auth/auth");
const {
  getAllUsers,
  getFilteredUsers,
} = require("../../controllers/users/users");
const router = express.Router();

router.get("/users", isSignedIn, isAdmin, getAllUsers);

router.post("/users/filtered", isSignedIn, isAdmin, getFilteredUsers);

module.exports = router;
