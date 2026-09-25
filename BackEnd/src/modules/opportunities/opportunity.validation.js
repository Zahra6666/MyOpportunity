const validateOpportunityInput = (req, res, next) => {
  const { title, description, type_id, location, deadline } = req.body;

  const errors = [];

  if (!title || typeof title !== "string" || title.trim() === "") {
    errors.push("Title is required and must be a non-empty string.");
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    errors.push("Description is required and must be a non-empty string.");
  }

  if (!type_id || !Number.isInteger(Number(type_id)) || Number(type_id) <= 0) {
    errors.push("Type ID is required and must be a valid positive integer.");
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
