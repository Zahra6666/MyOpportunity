const usersService = require("./users.service");

const getMe = async (req, res) => {
  try {
    const user = await usersService.getUserById(req.user.id);

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = {
  getMe,
  getAllUsers,
};
