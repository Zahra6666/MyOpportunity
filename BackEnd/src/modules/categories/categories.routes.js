const express = require("express");
const router = express.Router();
const categoriesController = require("./categories.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const allowRoles = require("../../middleware/role.middleware");

router.get("/", categoriesController.getCategories);
router.post(
  "/",
  authMiddleware,
  allowRoles("admin"),
  categoriesController.createCategory,
);
router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  categoriesController.updateCategory,
);
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  categoriesController.deleteCategory,
);

module.exports = router;
