const express = require("express");

const { register, login } = require("./auth.controller");
const { registerSchema, loginSchema } = require("./auth.validation");
const validate = require("../../middleware/validate.middleware");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
