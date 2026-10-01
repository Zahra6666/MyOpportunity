import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  BriefcaseBusiness,
  AlertCircle,
  Trash2,
  Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import PageContainer from "../../components/layout/PageContainer";
import { getMyCV, deleteCV } from "../../services/cvService";

import "./CVAnalysisPage.css";

function CVAnalysisPage() {
  const navigate = useNavigate();

  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCVData() {
      try {
        setLoading(true);
        const response = await getMyCV();
        setCvData(response?.data || response);
      } catch (err) {
        setError(err.message || "فشل في جلب بيانات السيرة الذاتية");
      } finally {
        setLoading(false);
      }
    }

    fetchCVData();
  }, []);

  const handleDeleteCV = async () => {
    if (!window.confirm("هل أنتِ متأكدة من رغبتك في حذف السيرة الذاتية؟")) {
      return;
    }

    try {
      setDeleting(true);
      await deleteCV();
      navigate("/cv/upload");
    } catch (err) {
      alert(err.message || "حدث خطأ أثناء حذف السيرة الذاتية");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <PageContainer className="cv-analysis-page">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px", gap: "0.5rem" }}>
          <Loader2 size={24} className="animate-spin" />
          <span>جاري تحميل بيانات السيرة الذاتية...</span>
        </div>
      </PageContainer>
    );
  }

  const name = cvData?.full_name || cvData?.name || "غير محدد";
  const email = cvData?.email || "غير محدد";
  const phone = cvData?.phone || "غير محدد";
  const education = cvData?.education || "غير محدد";
  const experienceYears = cvData?.experience_years ? `${cvData.experience_years} سنوات` : (cvData?.experience || "غير محدد");
  const skills = Array.isArray(cvData?.skills) ? cvData.skills : [];
  const parsedText = cvData?.parsed_text || cvData?.parsedText || "";

  return (
    <PageContainer className="cv-analysis-page">
      <div className="container cv-analysis-container">

        <section className="cv-analysis-header">
          <div>
            <span className="cv-eyebrow">تحليل السيرة الذاتية</span>
            <h1>لنراجع ملفك المهني</h1>
            <p>هذه المعلومات المستخرجة من سيرتك الذاتية، ويمكن تعديلها من ملفك الشخصي.</p>
          </div>

          <Link to="/profile" className="cv-back-link">
            الملف الشخصي
            <ArrowLeft size={17} />
          </Link>
        </section>

        {error ? (
          <div className="cv-analysis-success" style={{ borderColor: "#fca5a5", backgroundColor: "#fef2f2" }}>
            <AlertCircle size={21} style={{ color: "#ef4444" }} />
            <div>
              <strong style={{ color: "#991b1b" }}>تنبيه</strong>
              <span style={{ color: "#b91c1c" }}>{error} - يرجى رفع سيرة ذاتية جديدة.</span>
            </div>
          </div>
        ) : (
          <div className="cv-analysis-success">
            <div className="cv-success-icon">
              <CheckCircle2 size={21} />
            </div>
            <div>
              <strong>تم تحليل السيرة الذاتية بنجاح</strong>
              <span>تم استخراج المعلومات الأساسية والمهارات من الملف.</span>
            </div>
          </div>
        )}

        <div className="cv-analysis-grid">
          <main>
            <section className="cv-card">
              <div className="cv-card-heading">
                <div>
                  <h2>المعلومات الشخصية</h2>
                  <p>المعلومات الأساسية الموجودة في سيرتك.</p>
                </div>
                <span className="verified-label">
                  <CheckCircle2 size={14} /> مستخرجة
                </span>
              </div>

              <div className="cv-personal-grid">
                <div className="cv-info-item">
                  <span className="cv-info-icon"><FileText size={17} /></span>
                  <div>
                    <small>الاسم الكامل</small>
                    <strong>{name}</strong>
                  </div>
                </div>

                <div className="cv-info-item">
                  <span className="cv-info-icon"><Mail size={17} /></span>
                  <div>
                    <small>البريد الإلكتروني</small>
                    <strong>{email}</strong>
                  </div>
                </div>

                <div className="cv-info-item">
                  <span className="cv-info-icon"><Phone size={17} /></span>
                  <div>
                    <small>رقم الهاتف</small>
                    <strong>{phone}</strong>
                  </div>
                </div>

                <div className="cv-info-item">
                  <span className="cv-info-icon"><GraduationCap size={17} /></span>
                  <div>
                    <small>التخصص / التعليم</small>
                    <strong>{education}</strong>
                  </div>
                </div>
              </div>
            </section>

            <section className="cv-card">
              <div className="cv-card-heading">
                <div>
                  <h2>الخبرة المهنية</h2>
                  <p>الخبرة التي تم التعرف عليها من السيرة.</p>
                </div>
              </div>

              <div className="cv-experience-box">
                <div className="cv-experience-icon">
                  <BriefcaseBusiness size={20} />
                </div>
                <div>
                  <span>إجمالي الخبرة</span>
                  <strong>{experienceYears}</strong>
                </div>
              </div>
            </section>

            <section className="cv-card">
              <div className="cv-card-heading">
                <div>
                  <h2>المهارات</h2>
                  <p>المهارات التي تم التعرف عليها في سيرتك.</p>
                </div>
              </div>

              <div className="cv-skills">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span key={index}>
                      <CheckCircle2 size={14} />
                      {skill}
                    </span>
                  ))
                ) : (
                  <p style={{ color: "#6b7280" }}>لم يتم التعرف على مهارات جديدة.</p>
                )}
              </div>
            </section>

            {parsedText && (
              <section className="cv-card">
                <div className="cv-card-heading">
                  <div>
                    <h2>النص المستخرج من السيرة</h2>
                    <p>المحتوى النصي الذي تم استخراجه تلقائياً.</p>
                  </div>
                </div>
                <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "8px", maxHeight: "200px", overflowY: "auto", fontSize: "0.875rem", whiteSpace: "pre-wrap", color: "#374151" }}>
                  {parsedText}
                </div>
              </section>
            )}
          </main>

          <aside className="cv-analysis-sidebar">
            <section className="cv-file-card">
              <div className="cv-file-icon"><FileText size={25} /></div>
              <div className="cv-file-info">
                <strong>{cvData?.original_filename || "ملف السيرة الذاتية"}</strong>
                <span>تم تحليل الملف</span>
              </div>
              <CheckCircle2 className="cv-file-check" size={19} />
            </section>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
              <Link to="/cv/upload" className="cv-reupload-link" style={{ textAlign: "center" }}>
                رفع نسخة جديدة من السيرة
              </Link>

              <button
                type="button"
                onClick={handleDeleteCV}
                disabled={deleting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #fca5a5",
                  backgroundColor: "#fff5f5",
                  color: "#e53e3e",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {deleting ? <Loader2 size={17} className="animate-spin" /> : <Trash2 size={17} />}
                حذف السيرة الذاتية
              </button>
            </div>
          </aside>
        </div>
      </div>
    </PageContainer>
  );
}

export default CVAnalysisPage;