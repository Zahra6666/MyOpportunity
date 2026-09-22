const usersRepository = require("./users.repository");

const getUserById = async (id) => {
  const user = await usersRepository.findUserById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const getAllUsers = async () => {
  return await usersRepository.findAllUsers();
};

const updateMe = async (userId, data) => {
  return await usersRepository.updateMe(userId, data);
};

const updateUser = async (userId, data) => {
  return await usersRepository.updateUser(userId, data);
};

const deleteMe = async (userId) => {
  return await usersRepository.deleteMe(userId);
};

const deleteUser = async (userId) => {
  return await usersRepository.deleteUser(userId);
};

module.exports = {
  getUserById,
  getAllUsers,
  updateMe,
  deleteMe,
  updateUser,
  deleteUser,
};
