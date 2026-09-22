const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const usersRoutes = require("./modules/users/users.routes");

const categoriesRouter = require("./modules/categories/categories.routes");
const companiesRouter = require("./modules/companies/companies.routes");
const adminCompaniesRouter = require("./modules/companies/companies.admin.routes");

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

app.use("/api/categories", categoriesRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/admin/companies", adminCompaniesRouter);

module.exports = app;
