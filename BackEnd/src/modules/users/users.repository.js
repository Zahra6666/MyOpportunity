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

module.exports = {
  findUserById,
  findAllUsers,
};
