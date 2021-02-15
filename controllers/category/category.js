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
    connection.db().query(createCategoryQuery, (error, result, fields) => {
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
          data: {
            cat_id: result.insertId,
            cat_name: name,
          },
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
    const { cat_id, sub_cat_name } = req.body;
    const getCategoryQuery = `select cat_name from tbl_category where cat_id=${cat_id}`;
    connection.db().query(getCategoryQuery, (error, result) => {
      if (error || result.length <= 0) {
        return res.json({
          isError: true,
          message: "Unable To Create Subcategory",
          error,
        });
      } else {
        const createSubCategoryQuery = `insert into tbl_sub_category(sub_cat_name,cat_id,created_at) values ('${sub_cat_name}','${cat_id}',CURRENT_TIMESTAMP())`;
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      isError: true,
      message: errors.array()[0].msg,
    });
  }
  const { id } = req.body;
  const getCategoryQuery = `select cat_name from tbl_category where cat_id=${id}`;
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
        data: result[0],
      });
    }
  });
};

exports.getSubCategoryById = (req, res) => {
  const { id } = req.body;
  const getCategoryQuery = `select sub_cat_name from tbl_sub_category where sub_cat_id=${id}`;
  connection.db().query(getCategoryQuery, (error, result) => {
    if (error || result.length <= 0) {
      return res.json({
        isError: true,
        message: "No Subcategory Found",
        error,
      });
    } else {
      return res.json({
        isError: false,
        data: result[0],
      });
    }
  });
};

exports.updateCategory = (req, res) => {
  const { id, updatedName } = req.body;
  const updateCategoryQuery = `UPDATE tbl_category SET cat_name = '${updatedName}' WHERE cat_id = ${id}`;
  connection.db().query(updateCategoryQuery, (error) => {
    if (error) {
      return res.json({
        isError: true,
        message: "Unable to update category",
        error,
      });
    }
    return res.json({
      isError: false,
      message: "Category updated successfully",
    });
  });
};

exports.toggleSubCategoryMode = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      isError: true,
      message: errors.array()[0].msg,
    });
  }
  const { id, mode } = req.body;
  const toggleSubCategoryMode = `UPDATE tbl_sub_category SET is_active = ${mode} WHERE sub_cat_id = ${id}`;
  connection.db().query(toggleSubCategoryMode, (error, result) => {
    if (error) {
      return res.json({
        isError: true,
        message: "Unable To Update",
        error: error,
      });
    } else {
      return res.json({
        isError: false,
        message: "Updated Successfully",
      });
    }
  });
};

exports.getCategories = (req, res) => {
  try {
    connection.db().query("select * from tbl_category", (error, result) => {
      if (error || result.length <= 0) {
        return res.json({
          isError: true,
          message: "No Categories Found",
          error: error,
        });
      } else {
        return res.json({
          isError: false,
          data: result,
        });
      }
    });
  } catch (error) {}
};

exports.getSubCategories = (req, res) => {
  try {
    connection.db().query("select * from tbl_sub_category", (error, result) => {
      if (error || result.length <= 0) {
        return res.json({
          isError: true,
          message: "No SubCategories Found",
          error: error,
        });
      } else {
        return res.json({
          isError: false,
          data: result,
        });
      }
    });
  } catch (error) {}
};

exports.removeCategory = (req, res) => {
  const { id } = req.body;
  try {
    const removeCategoryQuery = `DELETE FROM tbl_category WHERE cat_id = ${id}`;
    connection.db().query(removeCategoryQuery, (error) => {
      if (error) {
        return res.json({
          isError: true,
          message: "Unable to delete category",
          error: error,
        });
      } else {
        return res.json({
          isError: true,
          message: "Category Deleted Successfully",
        });
      }
    });
  } catch (error) {}
};

exports.getSubCategoriesByCategoryId = (req, res) => {
  const id = req.params.id;
  const getSubCategories = `select* from tbl_sub_category where cat_id=${id}`;
  connection.db().query(getSubCategories, (error, result) => {
    if (error) {
      return res.json({
        isError: true,
        error: error,
      });
    } else {
      return res.json({
        isError: false,
        data: result,
      });
    }
  });
};
