const pool = require("../../config/db");

// GET /api/types
const getTypes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM types ORDER BY id ASC",
    );

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching types:", error);
    return res.status(500).json({
      success: false,
      message: "A server error occurred while retrieving types.",
    });
  }
};

// POST /api/types
const createType = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Type name is required.",
      });
    }

    const result = await pool.query(
      "INSERT INTO types (name) VALUES ($1) RETURNING id, name",
      [name.trim()],
    );

    return res.status(201).json({
      success: true,
      message: "Type created successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating type:", error);

    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Type name already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "A server error occurred while creating the type.",
    });
  }
};

// PUT /api/types/:id
const updateType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Type name is required.",
      });
    }

    const result = await pool.query(
      "UPDATE types SET name = $1 WHERE id = $2 RETURNING id, name",
      [name.trim(), id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Type not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Type updated successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating type:", error);

    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Type name already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "A server error occurred while updating the type.",
    });
  }
};

// DELETE /api/types/:id
const deleteType = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM types WHERE id = $1 RETURNING id",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Type not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Type deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting type:", error);
    return res.status(500).json({
      success: false,
      message: "A server error occurred while deleting the type.",
    });
  }
};

module.exports = {
  getTypes,
  createType,
  updateType,
  deleteType,
};
