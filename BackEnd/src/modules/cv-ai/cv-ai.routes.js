const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const { testCvAi } = require("./cv-ai.controller");

router.use(authMiddleware);

router.get("/test", testCvAi);

module.exports = router;
