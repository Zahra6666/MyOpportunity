import {
  ChevronDown,
  FileCheck2,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../common/Logo";
import { useAuthContext } from "../../context/AuthContext";
import NotificationBell from "../notifications/NotificationBell";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAuthContext();

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        <Logo />

        <nav
          className={`navbar-links ${
            mobileOpen ? "navbar-links-open" : ""
          }`}
        >
          <Link to="/" onClick={closeMobile}>
            الرئيسية
          </Link>

          <Link to="/opportunities" onClick={closeMobile}>
            استكشف الفرص
          </Link>

          <Link
            to="/opportunities?category=scholarship"
            onClick={closeMobile}
          >
            المنح الدراسية
          </Link>

          <Link
            to="/opportunities?category=training"
            onClick={closeMobile}
          >
            تدريب وتوظيف
          </Link>

          {isAuthenticated && (
            <Link to="/dashboard" onClick={closeMobile}>
              لوحة التحكم
            </Link>
          )}
        </nav>

        <div className="navbar-actions">

          <Link to="/cv/upload" className="ai-navbar-button">
          <FileCheck2 size={16} />
            <span>حلّل سيرتك بالذكاء الاصطناعي</span>
          </Link>

          <NotificationBell />

          {isAuthenticated ? (
            <Link to="/dashboard" className="user-navbar">
              <span className="user-avatar">
                {user?.name?.charAt(0) || "م"}
              </span>

              <span>
                {user?.name || "حسابي"}
              </span>

              <ChevronDown size={16} />
            </Link>
          ) : (
            <Link to="/login" className="login-link">
              <LogIn size={17} />
              تسجيل الدخول
            </Link>
          )}

          <button
            className="mobile-menu-button"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="القائمة"
          >
            {mobileOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;