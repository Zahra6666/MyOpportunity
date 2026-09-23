const pool = require("../../config/db");

class CvRepository {

  async saveOrUpdateCv(userId, rawFileUrl) {
    const query = `
      INSERT INTO user_cvs (user_id, raw_file_url)
      VALUES ($1, $2)
      ON CONFLICT (user_id) 
      DO UPDATE SET raw_file_url = EXCLUDED.raw_file_url, created_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, rawFileUrl]);
    return result.rows[0];
  }


  async getCvByUserId(userId) {
    const query = `SELECT * FROM user_cvs WHERE user_id = $1;`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }


  async getCvById(id) {
    const query = `SELECT * FROM user_cvs WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }


  async deleteCv(userId) {
    const query = `DELETE FROM user_cvs WHERE user_id = $1 RETURNING *;`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }
}

module.exports = new CvRepository();