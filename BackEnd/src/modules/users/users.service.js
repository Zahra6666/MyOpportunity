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

module.exports = {
  getUserById,
  getAllUsers,
};
