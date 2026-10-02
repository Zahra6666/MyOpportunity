import {
  ChevronDown,
  FileCheck2,
  LogIn,
  Menu,
  Moon,
  Sun,
  X,
  UserRound,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../common/Logo";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import NotificationBell from "../notifications/NotificationBell";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    navigate("/login");
  };

  const userName = user?.fullName || user?.name || "حسابي";
  const avatarLetter = userName.charAt(0) || "م";

  const isDark = theme === "dark";

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Logo />

        <nav
          className={`navbar-links ${mobileOpen ? "navbar-links-open" : ""}`}
        >
          <Link to="/" onClick={closeMobile}>
            الرئيسية
          </Link>

          <Link to="/opportunities" onClick={closeMobile}>
            استكشف الفرص
          </Link>

          <Link to="/companies" onClick={closeMobile}>
            الشركات
          </Link>

          <Link to="/about" onClick={closeMobile}>
            من نحن
          </Link>

          <Link to="/contact" onClick={closeMobile}>
            تواصل معنا
          </Link>

          <Link to="/dashboard" onClick={closeMobile}>
            لوحة التحكم
          </Link>
        </nav>

        <div className="navbar-actions">
          <Link to="/cv/upload" className="ai-navbar-button">
            <FileCheck2 size={16} />
            <span>حلّل سيرتك بالذكاء الاصطناعي</span>
          </Link>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
            title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
            style={{
              width: "42px",
              height: "42px",
              minWidth: "42px",
              padding: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              border: isDark
                ? "1px solid rgba(148, 163, 184, 0.3)"
                : "1px solid rgba(37, 99, 235, 0.15)",
              background: isDark
                ? "rgba(255, 255, 255, 0.07)"
                : "rgba(37, 99, 235, 0.06)",
              color: isDark ? "#fbbf24" : "#334155",
              cursor: "pointer",
              boxShadow: isDark
                ? "0 4px 12px rgba(0, 0, 0, 0.18)"
                : "0 3px 10px rgba(37, 99, 235, 0.08)",
              transition:
                "background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-1px)";
              event.currentTarget.style.background = isDark
                ? "rgba(255, 255, 255, 0.12)"
                : "rgba(37, 99, 235, 0.1)";
              event.currentTarget.style.boxShadow = isDark
                ? "0 6px 16px rgba(0, 0, 0, 0.25)"
                : "0 5px 14px rgba(37, 99, 235, 0.12)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translateY(0)";
              event.currentTarget.style.background = isDark
                ? "rgba(255, 255, 255, 0.07)"
                : "rgba(37, 99, 235, 0.06)";
              event.currentTarget.style.boxShadow = isDark
                ? "0 4px 12px rgba(0, 0, 0, 0.18)"
                : "0 3px 10px rgba(37, 99, 235, 0.08)";
            }}
          >
            {isDark ? (
              <Sun size={20} strokeWidth={2.2} />
            ) : (
              <Moon size={20} strokeWidth={2.2} />
            )}
          </button>

          <NotificationBell />

          {isAuthenticated ? (
            <div
              style={{
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => setAccountOpen((previous) => !previous)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "6px 9px",
                  border: "none",
                  borderRadius: "12px",
                  background: accountOpen
                    ? "rgba(85, 111, 48, 0.1)"
                    : "transparent",
                  color: "inherit",
                  cursor: "pointer",
                  font: "inherit",
                  transition: "background 0.2s ease",
                }}
              >
                <span
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#556F30",
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  {avatarLetter}
                </span>

                <span>{userName}</span>

                <ChevronDown
                  size={16}
                  style={{
                    transition: "transform 0.2s ease",
                    transform: accountOpen ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </button>

              {accountOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    width: "220px",
                    padding: "7px",
                    background: isDark ? "#1e293b" : "#ffffff",
                    color: isDark ? "#f8fafc" : "#1e293b",
                    border: isDark
                      ? "1px solid rgba(148, 163, 184, 0.25)"
                      : "1px solid rgba(0, 0, 0, 0.08)",
                    borderRadius: "14px",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                    zIndex: 1000,
                  }}
                >
                  <Link
                    to="/profile"
                    onClick={() => setAccountOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "11px 12px",
                      borderRadius: "10px",
                      color: "inherit",
                      textDecoration: "none",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <UserRound size={17} />
                    الملف الشخصي
                  </Link>

                  <div
                    style={{
                      height: "1px",
                      margin: "5px 4px",
                      background: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.08)",
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "11px 12px",
                      border: "none",
                      borderRadius: "10px",
                      background: "transparent",
                      color: "#B42318",
                      font: "inherit",
                      fontSize: "14px",
                      cursor: "pointer",
                      textAlign: "right",
                      boxSizing: "border-box",
                    }}
                  >
                    <LogOut size={17} />
                    تسجيل الخروج من الحساب
                  </button>
                </div>
              )}
            </div>
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
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
