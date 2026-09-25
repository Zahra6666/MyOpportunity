const opportunityService = require("./opportunity.service");
const db = require("../../config/db");

class OpportunityController {
  // GET /api/opportunities
  async getAll(req, res) {
    try {
      const filters = {
        category_id: req.query.category_id,
        location: req.query.location,
        type_id: req.query.type_id,
        search: req.query.search,
      };

      const opportunities =
        await opportunityService.getAllOpportunities(filters);

      return res.status(200).json({
        success: true,
        data: opportunities,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  }

  // GET /api/opportunities/:id
  async getById(req, res) {
    try {
      const { id } = req.params;

      const opportunity = await opportunityService.getOpportunityById(id);

      return res.status(200).json({
        success: true,
        data: opportunity,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  }

  // POST /api/opportunities
  async create(req, res) {
    try {
      const { category_id } = req.body;

      if (!category_id) {
        return res.status(400).json({
          success: false,
          message: "Category ID is required.",
        });
      }

      const companyResult = await db.query(
        "SELECT id FROM companies WHERE user_id = $1",
        [req.user.id],
      );

      if (companyResult.rows.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Company profile not found for this user.",
        });
      }

      const company_id = companyResult.rows[0].id;

      const opportunityData = {
        ...req.body,
        company_id,
      };

      const newOpportunity =
        await opportunityService.createOpportunity(opportunityData);

      return res.status(201).json({
        success: true,
        message: "Opportunity created successfully.",
        data: newOpportunity,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  }

  // PUT /api/opportunities/:id
  async update(req, res) {
    try {
      const { id } = req.params;

      const updatedOpportunity = await opportunityService.updateOpportunity(
        id,
        req.body,
      );

      return res.status(200).json({
        success: true,
        message: "Opportunity updated successfully.",
        data: updatedOpportunity,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  }

  // DELETE /api/opportunities/:id
  async delete(req, res) {
    try {
      const { id } = req.params;

      await opportunityService.deleteOpportunity(id);

      return res.status(200).json({
        success: true,
        message: "Opportunity deleted successfully.",
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  }
}

module.exports = new OpportunityController();
