import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import {
  getCompanyById,
  updateCompany,
} from "../../services/companyService";

import "./EditCompany.css";

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCompany();
  }, [id]);

  async function loadCompany() {
    setLoading(true);
    setError("");

    try {
      const response = await getCompanyById(id);

      const company =
        response?.company ||
        response?.data ||
        response;

      setFormData({
        name: company?.company_name || company?.name || "",
        logo: company?.logo_url || company?.logo || "",
        location: company?.location || "",
        description: company?.description || "",
      });
    } catch (requestError) {
      setError(
        requestError?.message ||
        "تعذر تحميل بيانات الشركة."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

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

    setSaving(true);
    setError("");

    try {
      await updateCompany(id, {
        company_name: formData.name.trim(),
        logo_url: formData.logo.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
      });

      navigate("/admin/employers");
    } catch (requestError) {
      setError(
        requestError?.message ||
        "تعذر تحديث بيانات الشركة."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="edit-company-page">
          <div className="edit-company-loading">
            <h2>
              جارٍ تحميل بيانات الشركة...
            </h2>

            <p>
              يتم جلب بيانات الشركة من الخادم.
            </p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="edit-company-page">

        <div className="edit-company-header">
          <span className="edit-company-eyebrow">
            إدارة الشركات
          </span>

          <h1>
            تعديل بيانات الشركة
          </h1>

          <p>
            يمكنك تعديل بيانات الشركة ثم حفظ
            التغييرات.
          </p>
        </div>

        {error && (
          <div className="edit-company-error">
            {error}
          </div>
        )}

        <form
          className="edit-company-form"
          onSubmit={handleSubmit}
        >

          <div className="edit-company-field">
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
            />
          </div>

          <div className="edit-company-field">
            <label htmlFor="logo">
              رابط شعار الشركة
            </label>

            <input
              id="logo"
              name="logo"
              type="url"
              value={formData.logo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="edit-company-field">
            <label htmlFor="location">
              الموقع
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="أدخل موقع الشركة"
            />
          </div>

          <div className="edit-company-field">
            <label htmlFor="description">
              وصف الشركة
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              placeholder="أدخل وصف الشركة"
            />
          </div>

          <div className="edit-company-actions">

            <button
              type="button"
              className="edit-company-cancel"
              onClick={() =>
                navigate("/admin/employers")
              }
              disabled={saving}
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="edit-company-submit"
              disabled={saving}
            >
              {saving
                ? "جارٍ الحفظ..."
                : "حفظ التعديلات"}
            </button>

          </div>

        </form>

      </div>
    </PageContainer>
  );
}

export default EditCompany;
