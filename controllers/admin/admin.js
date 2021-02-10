const { validationResult } = require("express-validator");
const connection = require("../../db");

//CREATE CATEGORY
exports.createCategory = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        isError: true,
        message: errors.array()[0].msg,
      });
    }
    const { name } = req.body;
    const createCategoryQuery = `insert into tbl_category (cat_name,created_at) values ('${name}',CURRENT_TIMESTAMP())`;
    connection.db().query(createCategoryQuery, (error, result) => {
      if (error) {
        return res.json({
          isError: true,
          message: "Unable to create Category",
          error: error,
        });
      } else {
        return res.json({
          isError: false,
          message: "Category Created Successfullly",
        });
      }
    });
  } catch (error) {
    return res.json({
      isError: true,
      message: "Unable To Create Category",
      error,
    });
  }
};

//CREATE SUBCATEGORY
exports.createSubCategory = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        isError: true,
        message: errors.array()[0].msg,
      });
    }
    const { cat_id, name } = req.body;
    const getCategoryQuery = `select cat_name from tbl_category where cat_id=${cat_id}`;
    connection.db().query(getCategoryQuery, (error, result) => {
      if (error || result.length <= 0) {
        return res.json({
          isError: true,
          message: "Unable To Create Subcategory",
          error,
        });
      } else {
        const createSubCategoryQuery = `insert into tbl_sub_category(sub_cat_name,cat_id,created_at) values ('${name}','${cat_id}',CURRENT_TIMESTAMP())`;
        connection.db().query(createSubCategoryQuery, (error) => {
          if (error) {
            return res.json({
              isError: true,
              message: "Unable To Create Subcategory",
              error,
            });
          } else {
            return res.json({
              isError: false,
              message: "SubCategory Created Successfully",
            });
          }
        });
      }
    });
  } catch (error) {
    return res.json({
      isError: true,
      message: "Unable To Create Category",
      error,
    });
  }
};

//GET CATEGORY BY ID
exports.getCategoryById = (req, res) => {
  const id = req.body;
  const getCategoryQuery = `select cat_name from tbl_category where cat_id=${cat_id}`;
  connection.db().query(getCategoryQuery, (error, result) => {
    if (error || result.length <= 0) {
      return res.json({
        isError: true,
        message: "No Category Found",
        error,
      });
    } else {
      return res.json({
        isError: false,
        data: result,
      });
    }
  });
};
