const express = require("express");

const app = express();

// Middleware لقراءة الـ JSON
app.use(express.json());

// استدعاء الـ Routes
const categoriesRouter = require("./modules/categories/categories.routes");

const companiesRouter = require("./modules/companies/companies.routes");

const adminCompaniesRouter = require("./modules/companies/companies.admin.routes");

app.use("/api/categories", categoriesRouter);

app.use("/api/companies", companiesRouter);

app.use("/api/admin/companies", adminCompaniesRouter);

module.exports = app;