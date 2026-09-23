const cvRepository = require("./cv.repository");

class CvService {
  async uploadCv(userId, filePath) {
    if (!filePath) {
      throw new Error("CV file is required");
    }
    return await cvRepository.saveOrUpdateCv(userId, filePath);
  }

  async getMyCv(userId) {
    const cv = await cvRepository.getCvByUserId(userId);
    if (!cv) {
      throw new Error("No CV found for this user");
    }
    return cv;
  }

  async getCvById(id) {
    const cv = await cvRepository.getCvById(id);
    if (!cv) {
      throw new Error("CV not found");
    }
    return cv;
  }

  async deleteCv(userId) {
    const deleted = await cvRepository.deleteCv(userId);
    if (!deleted) {
      throw new Error("No CV found to delete");
    }
    return { message: "CV deleted successfully" };
  }
}

module.exports = new CvService();