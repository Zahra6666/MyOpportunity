const pool = require('../../config/db');

class SavedRepository {

  async saveOpportunity(userId, opportunityId) {
    const query = `
      INSERT INTO saved_opportunities (user_id, opportunity_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, opportunity_id) DO NOTHING
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, opportunityId]);
    return result.rows[0];
  }

  async unsaveOpportunity(userId, opportunityId) {
    const query = `
      DELETE FROM saved_opportunities
      WHERE user_id = $1 AND opportunity_id = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, opportunityId]);
    return result.rows[0];
  }

  async getSavedByUserId(userId) {
    const query = `
      SELECT 
        s.id AS saved_id, 
        s.saved_at, 
        o.*
      FROM saved_opportunities s
      JOIN opportunities o ON s.opportunity_id = o.id
      WHERE s.user_id = $1
      ORDER BY s.saved_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
}

module.exports = new SavedRepository();