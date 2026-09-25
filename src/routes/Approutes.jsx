import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";

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
import Profile from "../pages/Profile/Profile";
import SavedOpportunities from "../pages/Saved/SavedOpportunities";
import CompanyPage from "../pages/Company/CompanyPage";
import ChatbotWindow from "../components/Chatbot/ChatbotButton";
import ChatbotButton from "../components/Chatbot/ChatbotButton";
import NotFound from "../pages/NotFound";
function AppRoutes() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/opportunities"
            element={<Opportunities />}
          />

          <Route
            path="/opportunities/:id"
            element={<OpportunityDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/cv/upload"
            element={<CVUploadPage />}
          />

          <Route
            path="/cv/analysis"
            element={<CVAnalysisPage />}
          />

          <Route
            path="/dashboard"
            element={<UserDashboard />}
          />

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/opportunities"
            element={<ManageOpportunities />}
          />

          <Route
            path="/admin/users"
            element={<ManageUsers />}
          />

          <Route
            path="/admin/employers"
            element={<ManageEmployers />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/saved"
            element={<SavedOpportunities />}
          />
          <Route
            path="/company/:id"
            element={<CompanyPage />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      <ChatbotButton />

        <Footer />

      </AuthProvider>

    </BrowserRouter>
  );
}

export default AppRoutes;