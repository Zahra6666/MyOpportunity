const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRepository = require("./auth.repository");

const register = async (fullName, email, password, phone) => {
  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser(
    fullName,
    email,
    passwordHash,
    1,
    phone,
  );

  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    phone: user.phone,
    role: "user",
  };
};

const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordCorrect) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

module.exports = {
  register,
  login,
};
