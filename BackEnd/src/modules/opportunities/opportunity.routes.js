const express = require("express");
const router = express.Router();

const opportunityController = require("./opportunity.controller");
const { validateOpportunityInput } = require("./opportunity.validation");

const authMiddleware = require("../../middleware/auth.middleware");
const allowRoles = require("../../middleware/role.middleware");

// Public Routes (Anyone can view opportunities)
router.get("/", opportunityController.getAll);
router.get("/:id", opportunityController.getById);


router.post(
  "/",
  authMiddleware,
  allowRoles("company", "admin"),
  validateOpportunityInput,
  opportunityController.create
);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("company", "admin"),
  opportunityController.update
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("company", "admin"),
  opportunityController.delete
);

module.exports = router;