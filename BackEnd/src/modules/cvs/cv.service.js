const cvRepository = require("./cv.repository");
const { extractText } = require("./cv.parser");
const { extractCvInfo } = require("../cv-ai/cv-ai.service");

class CvService {
  async uploadCv(userId, filePath, fileMimetype) {
    if (!filePath) {
      throw new Error("CV file is required");
    }

    const parsedText = await extractText(filePath, fileMimetype);

    await cvRepository.saveOrUpdateCv(userId, filePath, parsedText);

    await extractCvInfo(userId, parsedText);

    const updatedCv = await cvRepository.getCvByUserId(userId);

    return updatedCv;
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

  async deleteCvById(id) {
    const deleted = await cvRepository.deleteCvById(id);

    if (!deleted) {
      throw new Error("CV not found");
    }

    return { message: "CV deleted successfully" };
  }
}

module.exports = new CvService();
