const pool = require("../../config/db");

const findUserById = async (id) => {
  const result = await pool.query(
    `SELECT
       users.id,
       users.full_name,
       users.email,
       users.phone,
       roles.name AS role
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE users.id = $1`,
    [id],
  );

  return result.rows[0];
};

const findAllUsers = async () => {
  const result = await pool.query(
    `SELECT
       users.id,
       users.full_name,
       users.email,
       users.phone,
       roles.name AS role
     FROM users
     JOIN roles ON users.role_id = roles.id
     ORDER BY users.id`,
  );

  return result.rows;
};

const updateMe = async (userId, data) => {
  const { full_name, phone } = data;

  const result = await pool.query(
    `UPDATE users
     SET full_name = $1,
         phone = $2
     WHERE id = $3
     RETURNING id, full_name, email, phone, role_id`,
    [full_name, phone, userId],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  return result.rows[0];
};

const updateUser = async (userId, data) => {
  const { full_name, phone } = data;

  const result = await pool.query(
    `UPDATE users
     SET full_name = $1,
         phone = $2
     WHERE id = $3
     RETURNING id, full_name, email, phone, role_id`,
    [full_name, phone, userId],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  return result.rows[0];
};

const deleteMe = async (userId) => {
  const result = await pool.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING id`,
    [userId],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  return result.rows[0];
};

const deleteUser = async (userId) => {
  const result = await pool.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING id`,
    [userId],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  return result.rows[0];
};

module.exports = {
  findUserById,
  findAllUsers,
  updateMe,
  updateUser,
  deleteMe,
  deleteUser,
};
