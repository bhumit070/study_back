const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  createCategory,
  createSubCategory,
  getCategoryById,
  getSubCategoryById,
  toggleSubCategoryMode,
  getCategories,
  getSubCategories,
  removeCategory,
  getSubCategoriesByCategoryId,
  updateCategory,
  removeSubCategory,
} = require("../../controllers/category/category");
const { isAdmin, isSignedIn } = require("../../controllers/auth/auth");

//GET ALL CATEGORIES
router.get("/categories", isSignedIn, getCategories);

// GET ALL SUB CATEGORIES
router.get("/subcategories", isSignedIn, getSubCategories);

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
    check(
      "sub_cat_name",
      "Sub Category Name is Required (minimum 2 letters)"
    ).isLength({
      min: 2,
    }),
  ],
  isSignedIn,
  isAdmin,
  createSubCategory
);

//GET CATEGORY BY ID
router.post(
  "/category",
  [check("id", "No id found in the request").isLength({ min: 1 }).isNumeric()],
  getCategoryById
);

//GET SUBCATEGORY BY ID
router.post(
  "/subcategory",
  [check("id", "No id found in the request").isLength({ min: 1 }).isNumeric()],
  isSignedIn,
  isAdmin,
  getSubCategoryById
);

//TOGGLE ACTIVE STATUS OF SUBCATEGORY
router.post(
  "/subcategory/toggle",
  [
    check("id", "No id found in the request").isLength({ min: 1 }).isNumeric(),
    [
      check("mode", "no mode found in the request")
        .isLength({ min: 1, max: 1 })
        .isNumeric(),
    ],
  ],
  isSignedIn,
  isAdmin,
  toggleSubCategoryMode
);

router.get(
  "/subcategory/:id",
  isSignedIn,
  isAdmin,
  getSubCategoriesByCategoryId
);

router.delete("/category", isSignedIn, isAdmin, removeCategory);

router.put("/category", isSignedIn, isAdmin, updateCategory);

router.delete("/subcategory", isSignedIn, isAdmin, removeSubCategory);

module.exports = router;
