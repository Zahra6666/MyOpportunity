const pool = require("../../config/db");

// GET /api/companies

const getCompanies = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, user_id, company_name, logo_url, location, description, status, created_at
       FROM companies
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
      message: "A server error occurred while retrieving companies.",
    });
  }
};
// GET /api/companies/:id
const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, user_id, company_name, logo_url, location, description, status, created_at
       FROM companies
       WHERE id = $1`,
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
      message: "A server error occurred while retrieving the company.",
    });
  }
};
// POST /api/companies
const createCompany = async (req, res) => {
  try {
    const { company_name, logo_url, location, description } = req.body;

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

    // Only non-admin users are limited to one company
    if (user_role !== "admin") {
      const existingCompany = await pool.query(
        `SELECT id
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
       (user_id, company_name, logo_url, location, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        user_id,
        company_name.trim(),
        logo_url || null,
        location.trim(),
        description || null,
      ],
    );

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating company:", error);

    return res.status(500).json({
      success: false,
      message: "A server error occurred while creating the company.",
    });
  }
};
// PUT /api/companies/:id
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, logo_url, location, description } = req.body;

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
        message: "You are not allowed to update this company.",
      });
    }

    if (
      company_name === undefined &&
      logo_url === undefined &&
      location === undefined &&
      description === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update.",
      });
    }

    const result = await pool.query(
      `UPDATE companies
       SET company_name = COALESCE($1, company_name),
           logo_url = COALESCE($2, logo_url),
           location = COALESCE($3, location),
           description = COALESCE($4, description)
       WHERE id = $5
       RETURNING *`,
      [
        company_name ?? null,
        logo_url ?? null,
        location ?? null,
        description ?? null,
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
      message: "A server error occurred while updating the company.",
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
      message: "A server error occurred while deleting the company.",
    });
  }
};

// PUT /api/companies/:id/approve
const approveCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE companies
       SET status = 'approved'
       WHERE id = $1
       RETURNING *`,
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
      message: "Company approved successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error approving company:", error);

    return res.status(500).json({
      success: false,
      message: "A server error occurred while approving the company.",
    });
  }
};

// PUT /api/companies/:id/reject
const rejectCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE companies
       SET status = 'rejected'
       WHERE id = $1
       RETURNING *`,
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
      message: "Company rejected successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error rejecting company:", error);

    return res.status(500).json({
      success: false,
      message: "A server error occurred while rejecting the company.",
    });
  }
};
module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  approveCompany,
  rejectCompany,
};
