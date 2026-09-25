import {
  ArrowLeft,
  LockKeyhole,
  Mail,
  User,
  Sparkles,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import Button from "../../components/common/Button";
import { useAuthContext } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    login({
      name: form.name,
      email: form.email,
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
              أنشئ حسابك
            </h1>

            <p>
              ابدأ رحلة اكتشاف الفرص
              المناسبة لمسارك.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <label>
              الاسم الكامل

              <div className="input-with-icon">
                <User size={18} />

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    updateField(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="الاسم الكامل"
                  required
                />
              </div>
            </label>

            <label>
              البريد الإلكتروني

              <div className="input-with-icon">
                <Mail size={18} />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField(
                      "email",
                      e.target.value
                    )
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
                  value={form.password}
                  onChange={(e) =>
                    updateField(
                      "password",
                      e.target.value
                    )
                  }
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
            </label>

            <label className="terms-option">
              <input
                type="checkbox"
                required
              />

              أوافق على شروط الاستخدام
              وسياسة الخصوصية.
            </label>

            <Button
              type="submit"
              className="btn-full"
            >
              إنشاء الحساب
              <ArrowLeft size={17} />
            </Button>

          </form>

          <p className="auth-register">
            لديك حساب؟
            <Link to="/login">
              تسجيل الدخول
            </Link>
          </p>

        </div>

      </div>

    </main>
  );
}

export default Register;