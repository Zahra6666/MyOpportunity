import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import {
  createOpportunity,
  getCategories,
  getTypes,
} from "../../services/opportunityService";

import "./CreateOpportunity.css";

function CreateOpportunity() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    category_id: "",
    type_id: "",
    location: "",
    deadline: "",
    status: "active",
  });

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [categoriesResponse, typesResponse] = await Promise.all([
          getCategories(),
          getTypes(),
        ]);

        setCategories(
          Array.isArray(categoriesResponse?.data) ? categoriesResponse.data : [],
        );
        setTypes(Array.isArray(typesResponse?.data) ? typesResponse.data : []);
      } catch (requestError) {
        setError(requestError?.message || "تعذر تحميل التصنيفات والأنواع.");
      } finally {
        setOptionsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.category_id ||
      !form.type_id ||
      !form.location.trim() ||
      !form.deadline
    ) {
      setError("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    setLoading(true);

    try {
      await createOpportunity({
        title: form.title.trim(),
        description: form.description.trim(),
        // عمود requirements نص (TEXT) بالداتابيس، فنبعثه نص، كل متطلب بسطر
        requirements: form.requirements
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
          .join("\n"),
        category_id: Number(form.category_id),
        type_id: Number(form.type_id),
        location: form.location.trim(),
        deadline: form.deadline,
        status: form.status,
      });

      navigate("/admin/opportunities");
    } catch (requestError) {
      setError(requestError?.message || "تعذر إنشاء الفرصة.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer className="create-opportunity-page">
      <div className="container">
        <div className="create-opportunity-header">
          <div>
            <Link to="/admin/opportunities" className="back-link">
              <ArrowLeft size={16} />
              العودة إلى إدارة الفرص
            </Link>

            <h1>إضافة فرصة جديدة</h1>

            <p>أدخل بيانات الفرصة لإضافتها إلى المنصة.</p>
          </div>
        </div>

        {error && <div className="create-error">{error}</div>}

        <form className="create-opportunity-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>معلومات الفرصة</h2>

            <div className="form-grid">
              <div className="form-group full">
                <label htmlFor="title">عنوان الفرصة *</label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="مثال: مطور Frontend"
                />
              </div>

              <div className="form-group full">
                <label htmlFor="description">وصف الفرصة *</label>

                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="اكتب وصف الفرصة..."
                />
              </div>

              <div className="form-group full">
                <label htmlFor="requirements">المتطلبات</label>

                <textarea
                  id="requirements"
                  name="requirements"
                  rows="6"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder={"اكتب كل متطلب في سطر مستقل..."}
                />

                <small>كل سطر سيتم حفظه كمتطلب مستقل.</small>
              </div>

              <div className="form-group">
                <label htmlFor="category_id">نوع الفرصة *</label>

                <select
                  id="category_id"
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  disabled={optionsLoading}
                >
                  <option value="">
                    {optionsLoading ? "جارٍ التحميل..." : "اختر نوع الفرصة"}
                  </option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="type_id">نوع العمل *</label>

                <select
                  id="type_id"
                  name="type_id"
                  value={form.type_id}
                  onChange={handleChange}
                  disabled={optionsLoading}
                >
                  <option value="">
                    {optionsLoading ? "جارٍ التحميل..." : "اختر نوع العمل"}
                  </option>

                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">الموقع *</label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="مثال: البصرة"
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline">آخر موعد للتقديم *</label>

                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">الحالة</label>

                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="active">فعالة</option>

                  <option value="inactive">غير فعالة</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/admin/opportunities" className="cancel-button">
              إلغاء
            </Link>

            <button type="submit" className="submit-button" disabled={loading}>
              <Save size={17} />

              {loading ? "جارٍ إنشاء الفرصة..." : "إنشاء الفرصة"}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}

export default CreateOpportunity;