const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const usersRoutes = require("./modules/users/users.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "My Opportunity API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

module.exports = app;
