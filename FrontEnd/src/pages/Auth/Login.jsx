import "./Login.css";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../../components/common/Button";
import { useAuthContext } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      await login({
        email,
        password,
      });

      navigate("/dashboard");
    } catch (error) {
      setError(
        error?.message ||
          "تعذر تسجيل الدخول. يرجى التأكد من البريد الإلكتروني وكلمة المرور."
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-decoration" />

      <div className="container auth-container">
        <div className="auth-card">

          <div className="auth-logo">
            <span>
              <Sparkles size={18} />
            </span>
            فرصتي
          </div>

          <div className="auth-heading">
            <h1>
              أهلاً بك
            </h1>

            <p>
              سجّل دخولك لمتابعة فرصك والاستفادة من التحليل الذكي.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <label>
              البريد الإلكتروني

              <div className="input-with-icon">
                <Mail size={18} />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="example@email.com"
                  required
                />
              </div>
            </label>

            <label>
              كلمة المرور

              <div className="input-with-icon">
                <LockKeyhole size={18} />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  required
                />
              </div>
            </label>

            <div className="auth-options">
              <label className="remember-option">
                <input type="checkbox" />
                تذكّرني
              </label>

              <a href="/">
                هل نسيت كلمة المرور؟
              </a>
            </div>

            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="btn-full"
              disabled={loading}
            >
              {loading
                ? "جارٍ تسجيل الدخول..."
                : "تسجيل الدخول"}

              {!loading && <ArrowLeft size={17} />}
            </Button>

          </form>

          <div className="auth-divider">
            <span>أو</span>
          </div>

          <p className="auth-register">
            ليس لديك حساب؟
            <Link to="/register">
              إنشاء حساب جديد
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}

export default Login;