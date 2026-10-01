const express = require("express");

const router = express.Router();

const companiesController = require("./companies.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const allowRoles = require("../../middleware/role.middleware");
router.get("/", companiesController.getCompanies);
router.get("/:id", companiesController.getCompanyById);

router.post("/", authMiddleware, companiesController.createCompany);

router.put("/:id", authMiddleware, companiesController.updateCompany);

router.delete("/:id", authMiddleware, companiesController.deleteCompany);
module.exports = router;
