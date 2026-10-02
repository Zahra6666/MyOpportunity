const pool = require("../../config/db");

// GET /api/companies
// Public: approved companies only
const getCompanies = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         id,
         user_id,
         company_name,
         logo_url,
         website_url,
         location,
         description,
         status,
         created_at
       FROM companies
       WHERE status = 'approved'
       ORDER BY id ASC`,
    );

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/companies/admin/all
// Admin: all companies regardless of status
const getAllCompaniesForAdmin = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         c.id,
         c.user_id,
         c.company_name,
         c.logo_url,
         c.website_url,
         c.location,
         c.description,
         c.status,
         c.created_at,
         u.email
       FROM companies c
       LEFT JOIN users u
         ON u.id = c.user_id
       ORDER BY
         CASE
           WHEN c.status = 'pending' THEN 1
           WHEN c.status = 'approved' THEN 2
           WHEN c.status = 'rejected' THEN 3
           ELSE 4
         END,
         c.id DESC`,
    );

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching all companies for admin:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      detail: error.detail || null,
    });
  }
};

// GET /api/companies/:id
// Public: approved companies only
const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
         id,
         user_id,
         company_name,
         logo_url,
         website_url,
         location,
         description,
         status,
         created_at
       FROM companies
       WHERE id = $1
       AND status = 'approved'`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching company:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/companies
const createCompany = async (req, res) => {
  try {
    const { company_name, logo_url, website_url, location, description } =
      req.body;

    const user_id = req.user.id;
    const user_role = req.user.role;

    if (!company_name || company_name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    if (!location || location.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Location is required.",
      });
    }

    if (user_role === "company") {
      return res.status(403).json({
        success: false,
        message: "Company users cannot create another company.",
      });
    }

    if (user_role !== "admin") {
      const existingCompany = await pool.query(
        `SELECT id, status
         FROM companies
         WHERE user_id = $1`,
        [user_id],
      );

      if (existingCompany.rows.length > 0) {
        return res.status(400).json({
          success: false,
          message: "You already have a company.",
        });
      }
    }

    const result = await pool.query(
      `INSERT INTO companies
       (
         user_id,
         company_name,
         logo_url,
         website_url,
         location,
         description,
         status
       )
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING *`,
      [
        user_id,
        company_name.trim(),
        logo_url?.trim() || null,
        website_url?.trim() || null,
        location.trim(),
        description?.trim() || null,
      ],
    );

    return res.status(201).json({
      success: true,
      message: "Company created successfully and is pending admin approval.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating company:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/companies/:id
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const { company_name, logo_url, website_url, location, description } =
      req.body;

    const companyResult = await pool.query(
      `SELECT user_id, status
       FROM companies
       WHERE id = $1`,
      [id],
    );

    if (companyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const company = companyResult.rows[0];

    if (req.user.role !== "admin" && company.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this company.",
      });
    }

    if (
      company_name === undefined &&
      logo_url === undefined &&
      website_url === undefined &&
      location === undefined &&
      description === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update.",
      });
    }

    if (
      company_name !== undefined &&
      (!company_name || company_name.trim() === "")
    ) {
      return res.status(400).json({
        success: false,
        message: "Company name cannot be empty.",
      });
    }

    if (location !== undefined && (!location || location.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "Location cannot be empty.",
      });
    }

    const result = await pool.query(
      `UPDATE companies
       SET company_name = COALESCE($1, company_name),
           logo_url = COALESCE($2, logo_url),
           website_url = COALESCE($3, website_url),
           location = COALESCE($4, location),
           description = COALESCE($5, description)
       WHERE id = $6
       RETURNING *`,
      [
        company_name !== undefined ? company_name.trim() : null,
        logo_url !== undefined ? logo_url?.trim() || null : null,
        website_url !== undefined ? website_url?.trim() || null : null,
        location !== undefined ? location.trim() : null,
        description !== undefined ? description?.trim() || null : null,
        id,
      ],
    );

    return res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating company:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/companies/:id
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const companyResult = await pool.query(
      `SELECT user_id
       FROM companies
       WHERE id = $1`,
      [id],
    );

    if (companyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const company = companyResult.rows[0];

    if (req.user.role !== "admin" && company.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this company.",
      });
    }

    await pool.query("DELETE FROM companies WHERE id = $1", [id]);

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting company:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/companies/:id/approve
const approveCompany = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const companyResult = await client.query(
      `SELECT id, user_id, status
       FROM companies
       WHERE id = $1
       FOR UPDATE`,
      [id],
    );

    if (companyResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const company = companyResult.rows[0];

    if (company.status !== "pending") {
      await client.query("ROLLBACK");

      return res.status(400).json({
        success: false,
        message: `Company is already ${company.status}.`,
      });
    }

    const userId = company.user_id;

    const userResult = await client.query(
      `SELECT u.id, r.name AS role
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.id = $1`,
      [userId],
    );

    if (userResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Company owner not found.",
      });
    }

    const currentRole = userResult.rows[0].role;

    const result = await client.query(
      `UPDATE companies
       SET status = 'approved'
       WHERE id = $1
       RETURNING *`,
      [id],
    );

    if (currentRole === "user") {
      const companyRoleResult = await client.query(
        `SELECT id
         FROM roles
         WHERE name = 'company'`,
      );

      if (companyRoleResult.rows.length === 0) {
        await client.query("ROLLBACK");

        return res.status(500).json({
          success: false,
          message: "Company role not found.",
        });
      }

      const companyRoleId = companyRoleResult.rows[0].id;

      await client.query(
        `UPDATE users
         SET role_id = $1
         WHERE id = $2`,
        [companyRoleId, userId],
      );
    }

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message:
        currentRole === "user"
          ? "Company approved successfully. User role changed to company."
          : "Company approved successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Error approving company:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    client.release();
  }
};

// PUT /api/companies/:id/reject
const rejectCompany = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const companyResult = await client.query(
      `SELECT id, user_id, status
       FROM companies
       WHERE id = $1
       FOR UPDATE`,
      [id],
    );

    if (companyResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const company = companyResult.rows[0];

    if (company.status !== "pending") {
      await client.query("ROLLBACK");

      return res.status(400).json({
        success: false,
        message: `Company is already ${company.status}.`,
      });
    }

    const result = await client.query(
      `UPDATE companies
       SET status = 'rejected'
       WHERE id = $1
       RETURNING *`,
      [id],
    );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: "Company rejected successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Error rejecting company:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getCompanies,
  getAllCompaniesForAdmin,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  approveCompany,
  rejectCompany,
};
