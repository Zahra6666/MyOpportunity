const pool = require("../../config/db");

// GET /api/companies 

const getCompanies = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, user_id, company_name, logo_url, location, description, status, created_at
       FROM companies
       ORDER BY id ASC`
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
      [id]
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
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating company:", error);

    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "This user already has a company.",
      });
    }

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

    if (!company_name || company_name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    const result = await pool.query(
      `UPDATE companies
       SET company_name = $1,
           logo_url = $2,
           location = $3,
           description = $4
       WHERE id = $5
       RETURNING *`,
      [
        company_name.trim(),
        logo_url || null,
        location || null,
        description || null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

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
const deleteCompany = async (req, res) => { // أو deleteCompany
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM companies WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

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

// PUT /api/admin/companies/:id/approve
const approveCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE companies
       SET status = 'approved'
       WHERE id = $1
       RETURNING *`,
      [id]
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

// PUT /api/admin/companies/:id/reject
const rejectCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE companies
       SET status = 'rejected'
       WHERE id = $1
       RETURNING *`,
      [id]
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