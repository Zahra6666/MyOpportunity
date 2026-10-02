import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Home from "../pages/Home/Home";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Opportunities from "../pages/Opportunities/Opportunities";
import OpportunityDetails from "../pages/Opportunities/OpportunityDetails";

import CVUploadPage from "../pages/CV/CVUploadPage";
import CVAnalysisPage from "../pages/CV/CVAnalysisPage";

import UserDashboard from "../pages/Dashboard/UserDashboard";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageOpportunities from "../pages/Admin/ManageOpportunities";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageEmployers from "../pages/Admin/ManageEmployers";
import CreateOpportunity from "../pages/Admin/CreateOpportunity";
import EditOpportunity from "../pages/Admin/EditOpportunity";

import Profile from "../pages/Profile/Profile";
import SavedOpportunities from "../pages/Saved/SavedOpportunities";

import CompanyPage from "../pages/Company/CompanyPage";
import CreateCompany from "../pages/Company/CreateCompany";
import EditCompany from "../pages/Company/EditCompany";
import Companies from "../pages/Company/Companies";

import ChatbotButton from "../components/Chatbot/ChatbotButton";
import NotFound from "../pages/NotFound";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        <Route path="/opportunities" element={<Opportunities />} />

        <Route path="/opportunities/:id" element={<OpportunityDetails />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/companies" element={<Companies />} />

        <Route path="/companies/:id" element={<CompanyPage />} />

        <Route path="/companies/create" element={<CreateCompany />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/saved" element={<SavedOpportunities />} />

          <Route path="/cv/upload" element={<CVUploadPage />} />

          <Route path="/cv/analysis" element={<CVAnalysisPage />} />
        </Route>

        {/* Admin + Company */}
        <Route element={<RoleRoute allowedRoles={["admin", "company"]} />}>
          <Route path="/opportunities/create" element={<CreateOpportunity />} />
        </Route>

        {/* Admin */}
        <Route element={<RoleRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />

          <Route
            path="/admin/opportunities"
            element={<ManageOpportunities />}
          />

          <Route
            path="/admin/opportunities/new"
            element={<CreateOpportunity />}
          />

          <Route
            path="/admin/opportunities/:id/edit"
            element={<EditOpportunity />}
          />

          <Route path="/admin/users" element={<ManageUsers />} />

          <Route path="/admin/employers" element={<ManageEmployers />} />

          <Route path="/admin/employers/new" element={<CreateCompany />} />

          <Route path="/admin/employers/:id/edit" element={<EditCompany />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ChatbotButton />

      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
