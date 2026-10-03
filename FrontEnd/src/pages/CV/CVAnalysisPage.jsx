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
  Loader2,
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
        setError(null);

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
        <div className="cv-analysis-loading">
          <Loader2 size={24} className="animate-spin" />
          <span>جاري تحميل بيانات السيرة الذاتية...</span>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer className="cv-analysis-page">
        <div className="container cv-analysis-container">
          <div className="cv-analysis-error">
            <AlertCircle size={21} />
            <div className="cv-analysis-error-content">
              <strong>تنبيه</strong>
              <span>{error}</span>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  const name =
    cvData?.full_name || cvData?.fullName || cvData?.name || "غير محدد";

  const email = cvData?.email || "غير محدد";

  const phone =
    cvData?.phone || cvData?.phone_number || cvData?.phoneNumber || "غير محدد";

  const education = cvData?.education || "غير محدد";

  const experienceYears =
    cvData?.experience_years !== null &&
    cvData?.experience_years !== undefined &&
    cvData?.experience_years !== ""
      ? `${cvData.experience_years} سنوات`
      : cvData?.experience || "غير محدد";

  let skills = cvData?.skills || [];

  if (typeof skills === "string") {
    try {
      skills = JSON.parse(skills);
    } catch {
      skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }
  }

  if (!Array.isArray(skills)) {
    skills = [];
  }

  const parsedText = cvData?.parsed_text || cvData?.parsedText || "";

  return (
    <PageContainer className="cv-analysis-page">
      <div className="container cv-analysis-container">
        <section className="cv-analysis-header">
          <div className="cv-analysis-heading">
            <span className="cv-eyebrow">تحليل السيرة الذاتية</span>

            <h1>لنراجع ملفك المهني</h1>

            <p>
              هذه المعلومات المستخرجة من سيرتك الذاتية، ويمكن تعديلها من ملفك
              الشخصي.
            </p>
          </div>

          <Link to="/profile" className="cv-back-link">
            الملف الشخصي
            <ArrowLeft size={17} />
          </Link>
        </section>

        {/* SUCCESS MESSAGE */}
        <div className="cv-analysis-success">
          <div className="cv-success-icon">
            <CheckCircle2 size={21} />
          </div>

          <div className="cv-success-content">
            <strong>تم تحليل السيرة الذاتية بنجاح</strong>
            <span>تم استخراج المعلومات الأساسية والمهارات من الملف.</span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="cv-analysis-grid">
          <main className="cv-analysis-main">
            {/* PERSONAL INFORMATION */}
            <section className="cv-card">
              <div className="cv-card-heading">
                <div>
                  <h2>المعلومات الشخصية</h2>
                  <p>المعلومات الأساسية الموجودة في سيرتك.</p>
                </div>

                <span className="verified-label">
                  <CheckCircle2 size={14} />
                  مستخرجة
                </span>
              </div>

              <div className="cv-personal-grid">
                <div className="cv-info-item">
                  <span className="cv-info-icon">
                    <FileText size={17} />
                  </span>

                  <div>
                    <small>الاسم الكامل</small>
                    <strong>{name}</strong>
                  </div>
                </div>

                <div className="cv-info-item">
                  <span className="cv-info-icon">
                    <Mail size={17} />
                  </span>

                  <div>
                    <small>البريد الإلكتروني</small>
                    <strong>{email}</strong>
                  </div>
                </div>

                <div className="cv-info-item">
                  <span className="cv-info-icon">
                    <Phone size={17} />
                  </span>

                  <div>
                    <small>رقم الهاتف</small>
                    <strong dir="ltr" style={{ unicodeBidi: "isolate" }}>
                      {phone}
                    </strong>
                  </div>
                </div>

                <div className="cv-info-item">
                  <span className="cv-info-icon">
                    <GraduationCap size={17} />
                  </span>

                  <div>
                    <small>التخصص / التعليم</small>
                    <strong>{education}</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* EXPERIENCE */}
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

            {/* SKILLS */}
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
                  <p className="cv-no-skills">
                    لم يتم التعرف على مهارات جديدة.
                  </p>
                )}
              </div>
            </section>

            {/* EXTRACTED TEXT */}
            {parsedText && (
              <section className="cv-card cv-extracted-card">
                <div className="cv-card-heading">
                  <div>
                    <h2>النص المستخرج من السيرة</h2>
                    <p>المحتوى النصي الذي تم استخراجه تلقائياً.</p>
                  </div>
                </div>

                <div className="cv-extracted-text" dir="auto">
                  {parsedText}
                </div>
              </section>
            )}
          </main>

          {/* SIDEBAR */}
          <aside className="cv-analysis-sidebar">
            <section className="cv-file-card">
              <div className="cv-file-icon">
                <FileText size={25} />
              </div>

              <div className="cv-file-info">
                <strong>
                  {cvData?.original_filename || "ملف السيرة الذاتية"}
                </strong>

                <span>تم تحليل الملف</span>
              </div>

              <CheckCircle2 className="cv-file-check" size={19} />
            </section>

            <div className="cv-sidebar-actions">
              <Link to="/cv/upload" className="cv-reupload-link">
                رفع نسخة جديدة من السيرة
              </Link>

              <button
                type="button"
                onClick={handleDeleteCV}
                disabled={deleting}
                className="cv-delete-button"
              >
                {deleting ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Trash2 size={17} />
                )}
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
