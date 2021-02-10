const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  createCategory,
  createSubCategory,
} = require("../../controllers/admin/admin");
const { isAdmin, isSignedIn } = require("../../controllers/auth/auth");

//CREATE CATEGORY
router.post(
  "/create/category",
  [
    check("name", "Category Name is Required (minimum 2 letters)").isLength({
      min: 2,
    }),
  ],
  isSignedIn,
  isAdmin,
  createCategory
);

//CREATE SUBCATEGORY
router.post(
  "/create/subcategory",
  [
    check("cat_id", "Category id is missing").isNumeric(),
    check("name", "Sub Category Name is Required (minimum 2 letters)").isLength(
      {
        min: 2,
      }
    ),
  ],
  isSignedIn,
  isAdmin,
  createSubCategory
);

//GET CATEGORY BY ID
router.post("/category");
module.exports = router;
