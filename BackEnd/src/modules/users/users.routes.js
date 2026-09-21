const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const allowRoles = require("../../middleware/role.middleware");

const { getMe, getAllUsers } = require("./users.controller");

const router = express.Router();

router.get("/me", authMiddleware, getMe);

router.get("/", authMiddleware, allowRoles("admin"), getAllUsers);

module.exports = router;
