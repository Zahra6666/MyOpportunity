const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");

const {
  matchOpportunity,
  matchAllOpportunities,
} = require("./matching.controller");


router.get(
  "/opportunities/matches",
  authMiddleware,
  matchAllOpportunities
);


router.get(
  "/opportunities/:id/match",
  authMiddleware,
  matchOpportunity
);

module.exports = router;