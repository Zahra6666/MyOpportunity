const pool = require("../../config/db");

const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT
       users.id,
       users.full_name,
       users.email,
       users.password_hash,
       users.phone,
       roles.name AS role
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE users.email = $1`,
    [email],
  );

  return result.rows[0];
};

const createUser = async (
  fullName,
  email,
  passwordHash,
  roleId = 1,
  phone = null,
) => {
  const result = await pool.query(
    `INSERT INTO users (
       role_id,
       full_name,
       email,
       password_hash,
       phone
     )
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, full_name, email, phone, role_id`,
    [roleId, fullName, email, passwordHash, phone],
  );

  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
};
