const opportunityRepository = require("./opportunity.repository");

class OpportunityService {
  // 1. Get all opportunities with filter parameters
  async getAllOpportunities(filters) {
    return await opportunityRepository.findAll(filters);
  }

  // 2. Get single opportunity by ID
  async getOpportunityById(id) {
    const opportunity = await opportunityRepository.findById(id);
    if (!opportunity) {
      const error = new Error("Opportunity not found.");
      error.statusCode = 404;
      throw error;
    }
    return opportunity;
  }

  // 3. Create new opportunity
  async createOpportunity(data) {
    return await opportunityRepository.create(data);
  }

  // 4. Update existing opportunity
  async updateOpportunity(id, data) {
    // Check if opportunity exists first
    await this.getOpportunityById(id);
    return await opportunityRepository.update(id, data);
  }

  // 5. Delete opportunity
  async deleteOpportunity(id) {
    // Check if opportunity exists first
    await this.getOpportunityById(id);
    return await opportunityRepository.delete(id);
  }
}

module.exports = new OpportunityService();