const cvRepository = require("../cvs/cv.repository");
const { extractCvInfo } = require("./cv-ai.service");

const testCvAi = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.user_id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    const cv = await cvRepository.getCvByUserId(userId);

    if (!cv) {
      return res.status(404).json({
        success: false,
        message: "CV not found",
      });
    }

    if (!cv.parsed_text || !cv.parsed_text.trim()) {
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
    console.error("CV AI analysis error:", error);

    if (error.code === "CV_AI_CONFIG_ERROR") {
      return res.status(500).json({
        success: false,
        message: "CV AI service is not configured",
      });
    }

    if (error.code === "EMPTY_CV_TEXT") {
      return res.status(400).json({
        success: false,
        message: "CV text is empty",
      });
    }

    if (error.code === "INVALID_CV_AI_RESPONSE") {
      return res.status(500).json({
        success: false,
        message: "Invalid response from CV analysis AI",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to analyze CV",
    });
  }
};

module.exports = {
  testCvAi,
};