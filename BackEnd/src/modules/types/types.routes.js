const express = require("express");
const router = express.Router();

const typesController = require("./types.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const allowRoles = require("../../middleware/role.middleware");

router.get("/", typesController.getTypes);

router.post(
  "/",
  authMiddleware,
  allowRoles("admin"),
  typesController.createType,
);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  typesController.updateType,
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  typesController.deleteType,
);

module.exports = router;
