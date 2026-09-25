const express = require("express");
const router = express.Router();
const cvController = require("./cv.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const uploadMiddleware = require("../../middleware/upload.middleware");
const allowRoles = require("../../middleware/role.middleware");
router.use(authMiddleware);

router.post("/", uploadMiddleware.single("file"), cvController.upload);

router.get("/me", cvController.getMyCv);

router.get("/:id", cvController.getById);

router.delete("/:id", allowRoles("admin"), cvController.deleteById);

router.delete("/", cvController.delete);

module.exports = router;
