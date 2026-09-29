import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  BriefcaseBusiness,
  Clock3,
  Target,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";

import "./CVAnalysisPage.css";

function CVAnalysisPage() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git",
    "Responsive Design",
    "REST API",
  ];

  const missingSkills = [
    "TypeScript",
    "Unit Testing",
    "Node.js",
  ];

  const analysisData = {
    name: "حوراء علي",
    email: "hawraa@example.com",
    phone: "07XXXXXXXXX",
    education: "هندسة حاسبات",
    experience: "خبرة أقل من سنة",
    cvName: "Hawraa_Ali_CV.pdf",
    match: 87,
  };

  return (
    <PageContainer className="cv-analysis-page">
      <div className="container cv-analysis-container">

        {/* Header */}
        <section className="cv-analysis-header">
          <div>
            <span className="cv-eyebrow">
              تحليل السيرة الذاتية
            </span>

            <h1>
              لنراجع ملفك المهني
            </h1>

            <p>
              هذه المعلومات المستخرجة من سيرتك الذاتية،
              ويمكن تعدلينها من ملفك الشخصي.
            </p>
          </div>

          <Link
            to="/profile"
            className="cv-back-link"
          >
            الملف الشخصي
            <ArrowLeft size={17} />
          </Link>
        </section>

        {/* Success */}
        <div className="cv-analysis-success">
          <div className="cv-success-icon">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <strong>تم تحليل السيرة الذاتية بنجاح</strong>
            <span>
              تم استخراج المعلومات الأساسية والمهارات من الملف.
            </span>
          </div>
        </div>

        <div className="cv-analysis-grid">

          {/* Main */}
          <main>

            {/* Personal information */}
            <section className="cv-card">
              <div className="cv-card-heading">
                <div>
                  <h2>المعلومات الشخصية</h2>
                  <p>
                    المعلومات الأساسية الموجودة في سيرتك.
                  </p>
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
                    <strong>{analysisData.name}</strong>
                  </div>
                </div>

                <div className="cv-info-item">
                  <span className="cv-info-icon">
                    <Mail size={17} />
                  </span>

                  <div>
                    <small>البريد الإلكتروني</small>
                    <strong>{analysisData.email}</strong>
                  </div>
                </div>

                <div className="cv-info-item">
                  <span className="cv-info-icon">
                    <Phone size={17} />
                  </span>

                  <div>
                    <small>رقم الهاتف</small>
                    <strong>{analysisData.phone}</strong>
                  </div>
                </div>

                <div className="cv-info-item">
                  <span className="cv-info-icon">
                    <GraduationCap size={17} />
                  </span>

                  <div>
                    <small>التخصص / التعليم</small>
                    <strong>{analysisData.education}</strong>
                  </div>
                </div>

              </div>
            </section>

            {/* Experience */}
            <section className="cv-card">
              <div className="cv-card-heading">
                <div>
                  <h2>الخبرة المهنية</h2>
                  <p>
                    الخبرة التي تم التعرف عليها من السيرة.
                  </p>
                </div>
              </div>

              <div className="cv-experience-box">
                <div className="cv-experience-icon">
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <span>إجمالي الخبرة</span>
                  <strong>{analysisData.experience}</strong>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="cv-card">
              <div className="cv-card-heading">
                <div>
                  <h2>المهارات</h2>
                  <p>
                    المهارات التي تم التعرف عليها في سيرتك.
                  </p>
                </div>
              </div>

              <div className="cv-skills">
                {skills.map((skill) => (
                  <span key={skill}>
                    <CheckCircle2 size={14} />
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Missing skills */}
            <section className="cv-card">
              <div className="cv-card-heading">
                <div>
                  <h2>مهارات ممكن تطوريها</h2>
                  <p>
                    مهارات إضافية قد تساعدك في الحصول على فرص أكثر.
                  </p>
                </div>
              </div>

              <div className="cv-missing-skills">
                {missingSkills.map((skill) => (
                  <span key={skill}>
                    <AlertCircle size={14} />
                    {skill}
                  </span>
                ))}
              </div>
            </section>

          </main>

          {/* Sidebar */}
          <aside className="cv-analysis-sidebar">

            {/* File */}
            <section className="cv-file-card">
              <div className="cv-file-icon">
                <FileText size={25} />
              </div>

              <div className="cv-file-info">
                <strong>{analysisData.cvName}</strong>
                <span>تم تحليل الملف</span>
              </div>

              <CheckCircle2
                className="cv-file-check"
                size={19}
              />
            </section>

            {/* Match */}
            <section className="cv-match-card">
              <div className="cv-match-header">
                <div>
                  <span>جاهزية ملفك للفرص</span>
                  <strong>{analysisData.match}%</strong>
                </div>

                <div className="cv-match-circle">
                  <svg viewBox="0 0 42 42">
                    <circle
                      className="cv-match-bg"
                      cx="21"
                      cy="21"
                      r="17"
                    />

                    <circle
                      className="cv-match-progress"
                      cx="21"
                      cy="21"
                      r="17"
                    />
                  </svg>

                  <span>
                    {analysisData.match}%
                  </span>
                </div>
              </div>

              <div className="cv-match-bar">
                <span
                  style={{
                    width: `${analysisData.match}%`,
                  }}
                />
              </div>

              <p>
                ملفك يحتوي على معلومات جيدة، وتوجد بعض
                المهارات التي يمكن إضافتها لتحسين فرص التطابق.
              </p>

              <Link to="/opportunities">
                استكشاف الفرص المناسبة
                <ArrowLeft size={16} />
              </Link>
            </section>

            {/* Stats */}
            <section className="cv-mini-stats">

              <div>
                <span className="cv-mini-icon">
                  <Target size={17} />
                </span>

                <div>
                  <strong>24</strong>
                  <span>فرصة مناسبة</span>
                </div>
              </div>

              <div>
                <span className="cv-mini-icon">
                  <BriefcaseBusiness size={17} />
                </span>

                <div>
                  <strong>7</strong>
                  <span>مهارات أساسية</span>
                </div>
              </div>

              <div>
                <span className="cv-mini-icon">
                  <Clock3 size={17} />
                </span>

                <div>
                  <strong>3</strong>
                  <span>مهارات مقترحة</span>
                </div>
              </div>

            </section>

            <Link
              to="/cv/upload"
              className="cv-reupload-link"
            >
              رفع نسخة جديدة من السيرة
            </Link>

          </aside>
        </div>
      </div>
    </PageContainer>
  );
}

export default CVAnalysisPage;