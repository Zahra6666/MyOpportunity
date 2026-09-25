const db = require("../../config/db");

class OpportunityRepository {
  // 1. Get all opportunities with search and filter options
  async findAll(filters = {}) {
    let query = `
      SELECT
        o.*,
        c.company_name,
        c.logo_url AS company_logo,
        cat.name AS category_name,
        t.name AS type_name
      FROM opportunities o
      LEFT JOIN companies c ON o.company_id = c.id
      LEFT JOIN categories cat ON o.category_id = cat.id
      LEFT JOIN types t ON o.type_id = t.id
      WHERE 1=1
    `;

    const values = [];
    let paramIndex = 1;

    if (filters.category_id) {
      query += ` AND o.category_id = $${paramIndex++}`;
      values.push(filters.category_id);
    }

    if (filters.location) {
      query += ` AND o.location ILIKE $${paramIndex++}`;
      values.push(`%${filters.location}%`);
    }

    if (filters.type_id) {
      query += ` AND o.type_id = $${paramIndex++}`;
      values.push(filters.type_id);
    }

    if (filters.search) {
      query += ` AND (o.title ILIKE $${paramIndex} OR o.description ILIKE $${paramIndex})`;
      values.push(`%${filters.search}%`);
      paramIndex++;
    }

    query += ` ORDER BY o.created_at DESC`;

    const result = await db.query(query, values);
    return result.rows;
  }

  // 2. Get single opportunity by ID
  async findById(id) {
    const query = `
      SELECT
        o.*,
        c.company_name,
        c.logo_url AS company_logo,
        cat.name AS category_name,
        t.name AS type_name
      FROM opportunities o
      LEFT JOIN companies c ON o.company_id = c.id
      LEFT JOIN categories cat ON o.category_id = cat.id
      LEFT JOIN types t ON o.type_id = t.id
      WHERE o.id = $1
    `;

    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // 3. Create new opportunity
  async create(data) {
    const {
      company_id,
      category_id,
      title,
      description,
      requirements,
      type_id,
      location,
      deadline,
    } = data;

    const query = `
      INSERT INTO opportunities
        (company_id, category_id, title, description, requirements, type_id, location, deadline)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      company_id,
      category_id || null,
      title,
      description,
      requirements || null,
      type_id || null,
      location,
      deadline,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  // 4. Update opportunity
  async update(id, data) {
    const {
      category_id,
      title,
      description,
      requirements,
      type_id,
      location,
      deadline,
      status,
    } = data;

    const query = `
      UPDATE opportunities
      SET
        category_id = COALESCE($1, category_id),
        title = COALESCE($2, title),
        description = COALESCE($3, description),
        requirements = COALESCE($4, requirements),
        type_id = COALESCE($5, type_id),
        location = COALESCE($6, location),
        deadline = COALESCE($7, deadline),
        status = COALESCE($8, status)
      WHERE id = $9
      RETURNING *
    `;

    const values = [
      category_id,
      title,
      description,
      requirements,
      type_id,
      location,
      deadline,
      status,
      id,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  // 5. Delete opportunity
  async delete(id) {
    const query = `DELETE FROM opportunities WHERE id = $1 RETURNING *`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = new OpportunityRepository();
