const {
  matchCvWithOpportunity,
  matchCvWithAllOpportunities,
} = require("./matching.service");

const matchOpportunity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await matchCvWithOpportunity(userId, id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const statusCode =
      error.message === "CV not found" ||
      error.message === "Opportunity not found"
        ? 404
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

const matchAllOpportunities = async (req, res) => {
  try {
    const userId = req.user.id;

    const results = await matchCvWithAllOpportunities(userId);

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    const statusCode = error.message === "CV not found" ? 404 : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  matchOpportunity,
  matchAllOpportunities,
};
