const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const allowRoles = require("../../middleware/role.middleware");

const {
  getMe,
  getAllUsers,
  updateMe,
  deleteMe,
  updateUser,
  deleteUser,
} = require("./users.controller");

const router = express.Router();

router.get("/me", authMiddleware, getMe);

router.put("/me", authMiddleware, updateMe);

router.delete("/me", authMiddleware, deleteMe);

router.delete("/:id", authMiddleware, allowRoles("admin"), deleteUser);

router.get("/", authMiddleware, allowRoles("admin"), getAllUsers);

router.put("/:id", authMiddleware, allowRoles("admin"), updateUser);

module.exports = router;
