import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";

import {
  getOpportunityById,
  updateOpportunity,
} from "../../services/opportunityService";

import "./EditOpportunity.css";

function EditOpportunity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    let isMounted = true;

    const loadOpportunity = async () => {
      if (!id) {
        setError("معرّف الفرصة غير صالح.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response =
          await getOpportunityById(id);

        const opportunity =
          response?.opportunity ||
          response?.data ||
          response;

        if (!isMounted) {
          return;
        }

        const requirements =
          opportunity?.requirements || [];

        setForm({
          title:
            opportunity?.title ||
            opportunity?.name ||
            "",

          description:
            opportunity?.description ||
            opportunity?.details ||
            "",

          requirements: Array.isArray(
            requirements
          )
            ? requirements.join("\n")
            : String(requirements || ""),

          category_id:
            opportunity?.category_id ??
            opportunity?.category?.id ??
            "",

          type_id:
            opportunity?.type_id ??
            opportunity?.type?.id ??
            "",

          location:
            opportunity?.location || "",

          deadline:
            opportunity?.deadline ||
            opportunity?.application_deadline ||
            "",

          status:
            opportunity?.status ||
            "active",
        });
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError?.message ||
              "تعذر تحميل بيانات الفرصة."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOpportunity();

    return () => {
      isMounted = false;
    };
  }, [id]);

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
      setError(
        "يرجى ملء جميع الحقول المطلوبة."
      );
      return;
    }

    setSaving(true);

    try {
      await updateOpportunity(id, {
        title: form.title.trim(),

        description:
          form.description.trim(),

        requirements:
          form.requirements
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),

        category_id:
          Number(form.category_id),

        type_id:
          Number(form.type_id),

        location:
          form.location.trim(),

        deadline:
          form.deadline,

        status:
          form.status,
      });

      navigate("/admin/opportunities");
    } catch (requestError) {
      setError(
        requestError?.message ||
          "تعذر تحديث الفرصة."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageContainer className="edit-opportunity-page">
        <div className="container">
          <div className="edit-loading">
            جارٍ تحميل بيانات الفرصة...
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="edit-opportunity-page">
      <div className="container">

        <div className="edit-opportunity-header">

          <div>
            <Link
              to="/admin/opportunities"
              className="back-link"
            >
              <ArrowLeft size={16} />
              العودة إلى إدارة الفرص
            </Link>

            <h1>
              تعديل الفرصة
            </h1>

            <p>
              عدّل بيانات الفرصة ثم احفظ التغييرات.
            </p>
          </div>

        </div>

        {error && (
          <div className="edit-error">
            {error}
          </div>
        )}

        <form
          className="edit-opportunity-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section">

            <h2>
              معلومات الفرصة
            </h2>

            <div className="form-grid">

              <div className="form-group full">
                <label htmlFor="title">
                  عنوان الفرصة *
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full">
                <label htmlFor="description">
                  وصف الفرصة *
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full">
                <label htmlFor="requirements">
                  المتطلبات
                </label>

                <textarea
                  id="requirements"
                  name="requirements"
                  rows="6"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder="كل متطلب في سطر مستقل"
                />

                <small>
                  كل سطر سيتم إرساله كمتطلب مستقل.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="category_id">
                  معرّف التصنيف *
                </label>

                <input
                  id="category_id"
                  name="category_id"
                  type="number"
                  min="1"
                  value={form.category_id}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="type_id">
                  معرّف النوع *
                </label>

                <input
                  id="type_id"
                  name="type_id"
                  type="number"
                  min="1"
                  value={form.type_id}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">
                  الموقع *
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline">
                  آخر موعد للتقديم *
                </label>

                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">
                  الحالة
                </label>

                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="active">
                    فعالة
                  </option>

                  <option value="inactive">
                    غير فعالة
                  </option>
                </select>
              </div>

            </div>

          </div>

          <div className="form-actions">

            <Link
              to="/admin/opportunities"
              className="cancel-button"
            >
              إلغاء
            </Link>

            <button
              type="submit"
              className="submit-button"
              disabled={saving}
            >
              <Save size={17} />

              {saving
                ? "جارٍ حفظ التعديلات..."
                : "حفظ التعديلات"}
            </button>

          </div>

        </form>

      </div>
    </PageContainer>
  );
}

export default EditOpportunity;