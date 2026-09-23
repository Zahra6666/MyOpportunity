const savedRepository = require('./saved.repository');

class SavedService {
  async saveOpportunity(userId, opportunityId) {
    const saved = await savedRepository.saveOpportunity(userId, opportunityId);
    if (!saved) {
      return { isAlreadySaved: true, message: "Opportunity is already saved" };
    }
    return { isAlreadySaved: false, data: saved };
  }

  async unsaveOpportunity(userId, opportunityId) {
    const unsaved = await savedRepository.unsaveOpportunity(userId, opportunityId);
    if (!unsaved) {
      throw new Error("Opportunity was not saved or already removed");
    }
    return { message: "Opportunity removed from saved list successfully" };
  }

  async getMySavedOpportunities(userId) {
    return await savedRepository.getSavedByUserId(userId);
  }
}

module.exports = new SavedService();