import { useState } from "react";
import { Building2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/common/Button";

import { createCompany } from "../../services/companyService";

import "./CreateCompany.css";

function CreateCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("يرجى إدخال اسم الشركة.");
      return;
    }

    if (!formData.location.trim()) {
      setError("يرجى إدخال موقع الشركة.");
      return;
    }

    if (!formData.description.trim()) {
      setError("يرجى إدخال وصف الشركة.");
      return;
    }

    setLoading(true);

    try {
      await createCompany({
        name: formData.name.trim(),
        logo: formData.logo.trim() || null,
        location: formData.location.trim(),
        description: formData.description.trim(),
      });

      navigate("/admin/employers");
    } catch (err) {
      setError(
        err?.message ||
          "تعذر إنشاء الشركة."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer className="create-company-page">
      <div className="container">

        <div className="create-company-header">

          <div>
            <div className="create-company-breadcrumb">
              <Link to="/admin/employers">
                إدارة الشركات
              </Link>

              <span>/</span>

              <span>
                إضافة شركة
              </span>
            </div>

            <h1>
              إضافة شركة
            </h1>

            <p>
              أدخل معلومات الشركة لإرسال طلب إنشاء الشركة.
            </p>
          </div>

          <Link
            to="/admin/employers"
            className="create-company-back"
          >
            العودة
            <ArrowRight size={16} />
          </Link>

        </div>


        <section className="create-company-card">

          <div className="create-company-title">

            <div className="create-company-icon">
              <Building2 size={22} />
            </div>

            <div>
              <h2>
                معلومات الشركة
              </h2>

              <p>
                أدخل البيانات الأساسية للشركة.
              </p>
            </div>

          </div>


          {error && (
            <div className="create-company-error">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            <div className="create-company-grid">

              <div className="create-company-field">

                <label htmlFor="name">
                  اسم الشركة
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسم الشركة"
                  disabled={loading}
                />

              </div>


              <div className="create-company-field">

                <label htmlFor="location">
                  الموقع
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="مثال: بغداد، العراق"
                  disabled={loading}
                />

              </div>


              <div className="create-company-field">

                <label htmlFor="logo">
                  رابط الشعار
                </label>

                <input
                  id="logo"
                  name="logo"
                  type="url"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                  disabled={loading}
                />

              </div>


              <div className="create-company-field create-company-field-full">

                <label htmlFor="description">
                  وصف الشركة
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="اكتب وصفًا مختصرًا عن الشركة..."
                  rows={6}
                  disabled={loading}
                />

              </div>

            </div>


            <div className="create-company-actions">

              <Link
                to="/admin/employers"
                className="create-company-cancel"
              >
                إلغاء
              </Link>

              <Button
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "جارٍ إنشاء الشركة..."
                  : "إنشاء الشركة"}
              </Button>

            </div>

          </form>

        </section>

      </div>
    </PageContainer>
  );
}

export default CreateCompany; 