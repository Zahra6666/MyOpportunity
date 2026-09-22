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

const updateMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await usersService.updateMe(userId, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const updatedUser = await usersService.updateUser(userId, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

const deleteMe = async (req, res) => {
  try {
    const userId = req.user.id;

    await usersService.deleteMe(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    await usersService.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = {
  getMe,
  getAllUsers,
  updateMe,
  updateUser,
  deleteMe,
  deleteUser,
};
