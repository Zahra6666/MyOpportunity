const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./modules/auth/auth.routes");
const usersRoutes = require("./modules/users/users.routes");

const categoriesRouter = require("./modules/categories/categories.routes");
const companiesRouter = require("./modules/companies/companies.routes");
const adminCompaniesRouter = require("./modules/companies/companies.admin.routes");

const opportunitiesRouter = require("./modules/opportunities/opportunity.routes");
const savedRoutes = require("./modules/saved/saved.routes");
const cvRoutes = require("./modules/cvs/cv.routes"); // إضافة مسار الـ CVs

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// إتاحة الوصول لملفات السير الذاتية المرفوعة
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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

app.use("/api/opportunities", opportunitiesRouter);
app.use("/api", savedRoutes);
app.use("/api/cvs", cvRoutes); // ربط مسار الـ CVs

module.exports = app;