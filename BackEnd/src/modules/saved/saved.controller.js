const savedService = require('./saved.service');

class SavedController {
  // POST /api/opportunities/:id/save
  async save(req, res) {
    try {
      const userId = req.user.id;
      const opportunityId = req.params.id;

      const result = await savedService.saveOpportunity(userId, opportunityId);

      if (result.isAlreadySaved) {
        return res.status(200).json({
          success: true,
          message: result.message
        });
      }

      return res.status(201).json({
        success: true,
        data: result.data
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // DELETE /api/opportunities/:id/save
  async unsave(req, res) {
    try {
      const userId = req.user.id;
      const opportunityId = req.params.id;

      const result = await savedService.unsaveOpportunity(userId, opportunityId);

      return res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET /api/me/saved
  async getMySaved(req, res) {
    try {
      const userId = req.user.id;
      const savedOpportunities = await savedService.getMySavedOpportunities(userId);

      return res.status(200).json({
        success: true,
        count: savedOpportunities.length,
        data: savedOpportunities
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new SavedController();