const cvRepository = require("./cv.repository");
const { extractText } = require("./cv.parser");
const { extractCvInfo } = require("../cv-ai/cv-ai.service");

class CvService {
  async uploadCv(userId, filePath, fileMimetype) {
    if (!filePath) {
      const error = new Error("CV file is required");
      error.statusCode = 400;
      throw error;
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
      const error = new Error("No CV found for this user");
      error.statusCode = 404;
      throw error;
    }

    return cv;
  }

  async getCvById(id) {
    const cv = await cvRepository.getCvById(id);

    if (!cv) {
      const error = new Error("CV not found");
      error.statusCode = 404;
      throw error;
    }

    return cv;
  }

  async deleteCv(userId) {
    const deleted = await cvRepository.deleteCv(userId);

    if (!deleted) {
      const error = new Error("No CV found to delete");
      error.statusCode = 404;
      throw error;
    }

    return {
      message: "CV deleted successfully",
    };
  }

  async deleteCvById(id) {
    const deleted = await cvRepository.deleteCvById(id);

    if (!deleted) {
      const error = new Error("CV not found");
      error.statusCode = 404;
      throw error;
    }

    return {
      message: "CV deleted successfully",
    };
  }
}

module.exports = new CvService();
