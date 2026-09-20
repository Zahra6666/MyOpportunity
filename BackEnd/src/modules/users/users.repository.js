const pool = require("../../config/db");

const findUserById = async (id) => {
  const result = await pool.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [id],
  );

  return result.rows[0];
};

module.exports = {
  findUserById,
};
