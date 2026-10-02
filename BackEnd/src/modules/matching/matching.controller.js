const {
  matchCvWithOpportunity,
  matchCvWithAllOpportunities,
} = require("./matching.service");

const getUserId = (req) => {
  return req.user?.id || req.user?.user_id;
};

const matchOpportunity = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id: opportunityId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    if (!opportunityId) {
      return res.status(400).json({
        success: false,
        message: "Opportunity ID is required",
      });
    }

    const result = await matchCvWithOpportunity(
      userId,
      opportunityId
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Match opportunity error:", error);

    if (error.code === "CV_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "CV not found",
      });
    }

    if (error.code === "OPPORTUNITY_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    if (error.code === "MATCHING_CONFIG_ERROR") {
      return res.status(500).json({
        success: false,
        message: "Matching service is not configured",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate opportunity match",
    });
  }
};

const matchAllOpportunities = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    const results = await matchCvWithAllOpportunities(userId);

    return res.status(200).json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    console.error("Match all opportunities error:", error);

    if (error.code === "CV_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "CV not found",
      });
    }

    if (error.code === "MATCHING_CONFIG_ERROR") {
      return res.status(500).json({
        success: false,
        message: "Matching service is not configured",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate opportunity matches",
    });
  }
};

module.exports = {
  matchOpportunity,
  matchAllOpportunities,
};