const opportunityService = require("./opportunity.service");

class OpportunityController {
  // GET /api/opportunities
  async getAll(req, res) {
    try {
      const filters = {
        category_id: req.query.category_id,
        location: req.query.location,
        opportunity_type: req.query.opportunity_type,
        search: req.query.search,
      };

      const opportunities = await opportunityService.getAllOpportunities(filters);
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
      // req.user comes from authMiddleware / JWT token
      const company_id = req.body.company_id || (req.user ? req.user.company_id : null);

      const opportunityData = {
        ...req.body,
        company_id,
      };

      const newOpportunity = await opportunityService.createOpportunity(opportunityData);
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
      const updatedOpportunity = await opportunityService.updateOpportunity(id, req.body);
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