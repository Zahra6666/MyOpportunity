const pool = require("../../config/db");

class CvRepository {
  async saveOrUpdateCv(userId, rawFileUrl, parsedText) {
    const query = `
      INSERT INTO user_cvs (user_id, raw_file_url, parsed_text)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id)
      DO UPDATE SET
        raw_file_url = EXCLUDED.raw_file_url,
        parsed_text = EXCLUDED.parsed_text,
        skills = NULL,
        experience_years = 0,
        education = NULL,
        created_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    const result = await pool.query(query, [userId, rawFileUrl, parsedText]);

    return result.rows[0];
  }

  async getCvByUserId(userId) {
    const query = `
      SELECT *
      FROM user_cvs
      WHERE user_id = $1;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows[0];
  }

  async getCvById(id) {
    const query = `
      SELECT *
      FROM user_cvs
      WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
  }

  async deleteCv(userId) {
    const query = `
      DELETE FROM user_cvs
      WHERE user_id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows[0];
  }

  async deleteCvById(id) {
    const query = `
      DELETE FROM user_cvs
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
  }

  async updateCvAiData(
    userId,
    fullName,
    email,
    phone,
    skills,
    experienceYears,
    education,
  ) {
    const query = `
      UPDATE user_cvs
      SET
        full_name = $2,
        email = $3,
        phone = $4,
        skills = $5,
        experience_years = $6,
        education = $7
      WHERE user_id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [
      userId,
      fullName,
      email,
      phone,
      JSON.stringify(skills),
      experienceYears,
      education,
    ]);

    return result.rows[0];
  }
}

module.exports = new CvRepository();
