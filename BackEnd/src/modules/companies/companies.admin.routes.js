const express = require("express");

const router = express.Router();

const companiesController = require("./companies.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const allowRoles = require("../../middleware/role.middleware");

router.put(
  "/:id/approve",
  authMiddleware,
  allowRoles("admin"),
  companiesController.approveCompany
);

router.put(
  "/:id/reject",
  authMiddleware,
  allowRoles("admin"),
  companiesController.rejectCompany
);

module.exports = router;