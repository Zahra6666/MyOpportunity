
const validateOpportunityInput = (req, res, next) => {
  const { title, description, opportunity_type, location, deadline } = req.body;

  const errors = [];

  if (!title || typeof title !== "string" || title.trim() === "") {
    errors.push("Title is required and must be a non-empty string.");
  }

  if (!description || typeof description !== "string" || description.trim() === "") {
    errors.push("Description is required and must be a non-empty string.");
  }

  if (!opportunity_type || typeof opportunity_type !== "string" || opportunity_type.trim() === "") {
    errors.push("Opportunity type is required.");
  }

  if (!location || typeof location !== "string" || location.trim() === "") {
    errors.push("Location is required.");
  }

  if (!deadline || isNaN(Date.parse(deadline))) {
    errors.push("Deadline is required and must be a valid date.");
  } else if (new Date(deadline) < new Date().setHours(0, 0, 0, 0)) {
    errors.push("Deadline cannot be in the past.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: errors,
    });
  }

  next();
};

module.exports = {
  validateOpportunityInput,
};