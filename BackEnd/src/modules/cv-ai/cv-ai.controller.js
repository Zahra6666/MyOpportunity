const cvRepository = require("../cvs/cv.repository");
const { extractCvInfo } = require("./cv-ai.service");

const testCvAi = async (req, res) => {
  try {
    const userId = req.user.id;

    const cv = await cvRepository.getCvByUserId(userId);

    if (!cv) {
      return res.status(404).json({
        success: false,
        message: "CV not found",
      });
    }

    if (!cv.parsed_text) {
      return res.status(400).json({
        success: false,
        message: "CV text has not been extracted yet",
      });
    }

    const result = await extractCvInfo(userId, cv.parsed_text);

    return res.status(200).json({
      success: true,
      message: "CV analyzed successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  testCvAi,
};
