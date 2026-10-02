const express = require("express");

const router = express.Router();

const companiesController = require("./companies.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const allowRoles = require("../../middleware/role.middleware");

// Public routes
router.get("/", companiesController.getCompanies);

router.get(
  "/admin/all",
  authMiddleware,
  allowRoles("admin"),
  companiesController.getAllCompaniesForAdmin,
);

router.get("/:id", companiesController.getCompanyById);

// Authenticated routes
router.post("/", authMiddleware, companiesController.createCompany);

router.put("/:id", authMiddleware, companiesController.updateCompany);

router.delete("/:id", authMiddleware, companiesController.deleteCompany);

module.exports = router;
