const pool = require("../../config/db");

// GET /api/categories 
const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM categories ORDER BY id ASC"
    );

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "A server error occurred while retrieving categories.",
    });
  }
};

// POST /api/categories
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const result = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING id, name",
      [name.trim()]
    );

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating category:", error);
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Category name already exists.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "A server error occurred while creating the category.",
    });
  }
};

// PUT /api/categories/:id 
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const result = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING id, name",
      [name.trim(), id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating category:", error);
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Category name already exists.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "A server error occurred while updating the category.",
    });
  }
};

// DELETE /api/categories/:id
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      success: false,
      message: "A server error occurred while deleting the category.",
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};