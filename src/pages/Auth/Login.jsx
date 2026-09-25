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
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    login({
      name: email.split("@")[0] || "مستخدم",
      email,
    });

    navigate("/dashboard");
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
              أهلاً بعودتك
            </h1>

            <p>
              سجّل دخولك حتى تتابع فرصك
              وتستفيد من التحليل الذكي.
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
                تذكرني
              </label>

              <a href="/">
                نسيت كلمة المرور؟
              </a>

            </div>

            <Button
              type="submit"
              className="btn-full"
            >
              تسجيل الدخول
              <ArrowLeft size={17} />
            </Button>

          </form>

          <div className="auth-divider">
            <span>أو</span>
          </div>

          <p className="auth-register">
            ما عندك حساب؟
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