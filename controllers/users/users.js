const connection = require("../../db");

exports.getAllUsers = (req, res) => {
  const getUsersQuery = `select * from tbl_user where NOT is_admin=1`;
  connection.db().query(getUsersQuery, (error, result) => {
    if (error) {
      return res.json({
        isError: true,
        mnessage: "Unable to load users",
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

exports.getFilteredUsers = (req, res) => {
  const { filter } = req.body;
  const getFilteredUsersQuery = `select * from tbl_user where NOT is_admin=1 AND is_verified=${filter}`;
  connection.db().query(getFilteredUsersQuery, (error, result) => {
    if (error) {
      return res.json({
        isError: true,
        mnessage: "Unable to load users",
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
