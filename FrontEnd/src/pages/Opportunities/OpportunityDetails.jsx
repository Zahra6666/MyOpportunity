import {
  ArrowLeft,
  Bookmark,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Users,
  BriefcaseBusiness,
  CircleAlert,
  Send,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/common/Button";
import { getOpportunityById } from "../../services/opportunityService";

import "./OpportunityDetails.css";

function OpportunityDetails() {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOpportunityById(id);

        setOpportunity(response?.data || null);
      } catch (error) {
        setError(error.message || "فشل تحميل الفرصة.");
        setOpportunity(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  if (loading) {
    return (
      <PageContainer className="opportunity-details-page">
        <div className="container">
          <div className="details-not-found">
            <p>جاري تحميل الفرصة...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!opportunity) {
    return (
      <PageContainer className="opportunity-details-page">
        <div className="container">
          <div className="details-not-found">
            <div className="details-not-found-icon">
              <CircleAlert size={28} />
            </div>

            <h1>الفرصة غير موجودة</h1>

            <p>ما قدرنا نلقى الفرصة المطلوبة ضمن الفرص المتاحة حالياً.</p>

            <Link to="/opportunities">
              <ArrowLeft size={17} />
              العودة إلى استكشف الفرص
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  const title = opportunity.title || opportunity.name || "فرصة متاحة";

  const titleEn = opportunity.titleEn || opportunity.title_en || "";

  const companyName =
    opportunity.company ||
    opportunity.company_name ||
    opportunity.company?.name ||
    "الجهة الناشرة";

  const companyId =
    opportunity.companyId ||
    opportunity.company_id ||
    opportunity.company?.id ||
    "";

  const type =
    opportunity.type ||
    opportunity.type_name ||
    opportunity.opportunity_type ||
    opportunity.category ||
    "فرصة";

  const location = opportunity.location || "العراق";

  const mode =
    opportunity.mode ||
    opportunity.work_mode ||
    opportunity.work_type ||
    "غير محدد";

  const deadline =
    opportunity.deadline || opportunity.application_deadline || "غير محدد";

  const posted =
    opportunity.posted || opportunity.posted_at || opportunity.created_at || "";

  const description =
    opportunity.description ||
    opportunity.details ||
    "لا يوجد وصف تفصيلي متاح لهذه الفرصة حالياً.";

  const match = Number(opportunity.match ?? opportunity.match_percentage ?? 0);

  const matchingSkills = Array.isArray(
    opportunity.matchingSkills || opportunity.matching_skills,
  )
    ? opportunity.matchingSkills || opportunity.matching_skills
    : [];

  const missingSkills = Array.isArray(
    opportunity.missingSkills || opportunity.missing_skills,
  )
    ? opportunity.missingSkills || opportunity.missing_skills
    : [];

  const responsibilities = normalizeList(opportunity.responsibilities);

  const requirements = normalizeList(opportunity.requirements);

  const benefits = normalizeList(opportunity.benefits);

  const learningTime =
    opportunity.learningTime || opportunity.learning_time || "";

  const companyDescription =
    opportunity.companyDescription ||
    opportunity.company_description ||
    opportunity.company?.description ||
    "";

  const applyUrl =
    opportunity.applyUrl ||
    opportunity.apply_url ||
    opportunity.application_url ||
    opportunity.link ||
    "";

  const handleApply = () => {
    if (applyUrl) {
      window.open(applyUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const message = document.getElementById("application-message");

    if (message) {
      message.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <PageContainer className="opportunity-details-page">
      <div className="container">
        <div className="details-breadcrumb">
          <Link to="/">الرئيسية</Link>

          <span>/</span>

          <Link to="/opportunities">استكشف الفرص</Link>

          <span>/</span>

          <span>{title}</span>
        </div>

        <div className="opportunity-details-layout">
          <main className="opportunity-details-main">
            <section className="details-header-card">
              <div className="details-company-logo">
                {opportunity.company_logo || opportunity.company?.logo ? (
                  <img
                    src={opportunity.company_logo || opportunity.company?.logo}
                    alt={companyName}
                  />
                ) : (
                  <Building2 size={31} />
                )}
              </div>

              <div className="details-header-content">
                <div className="details-type-row">
                  <span className="details-type-badge">{type}</span>

                  {posted && (
                    <span className="details-posted">
                      {formatPostedDate(posted)}
                    </span>
                  )}
                </div>

                <h1>{title}</h1>

                {titleEn && <p className="details-title-en">{titleEn}</p>}

                {companyId ? (
                  <Link
                    to={`/company/${companyId}`}
                    className="details-company-link"
                  >
                    <Building2 size={15} />
                    {companyName}
                    <ExternalLink size={13} />
                  </Link>
                ) : (
                  <span className="details-company-link">
                    <Building2 size={15} />
                    {companyName}
                  </span>
                )}

                <div className="details-meta">
                  <span>
                    <MapPin size={15} />
                    {location}
                  </span>

                  <span>
                    <BriefcaseBusiness size={15} />
                    {mode}
                  </span>

                  <span>
                    <CalendarDays size={15} />
                    آخر موعد: {deadline}
                  </span>
                </div>
              </div>
            </section>

            <section className="details-card details-reveal">
              <div className="details-section-heading">
                <div className="details-section-icon">
                  <FileText size={17} />
                </div>

                <div>
                  <h2>عن الفرصة</h2>
                  <p>نبذة عن الفرصة والدور المطلوب</p>
                </div>
              </div>

              <p className="details-description">{description}</p>
            </section>

            {responsibilities.length > 0 && (
              <section className="details-card details-reveal">
                <div className="details-section-heading">
                  <div className="details-section-icon">
                    <BriefcaseBusiness size={17} />
                  </div>

                  <div>
                    <h2>المسؤوليات</h2>
                    <p>المهام الأساسية في هذه الفرصة</p>
                  </div>
                </div>

                <ul className="details-list">
                  {responsibilities.map((item, index) => (
                    <li key={index}>
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {requirements.length > 0 && (
              <section className="details-card details-reveal">
                <div className="details-section-heading">
                  <div className="details-section-icon">
                    <GraduationCap size={17} />
                  </div>

                  <div>
                    <h2>المتطلبات</h2>
                    <p>المهارات والخبرات المطلوبة</p>
                  </div>
                </div>

                <ul className="details-list">
                  {requirements.map((item, index) => (
                    <li key={index}>
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {benefits.length > 0 && (
              <section className="details-card details-reveal">
                <div className="details-section-heading">
                  <div className="details-section-icon">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <h2>المزايا</h2>
                    <p>ما توفره الجهة للمتقدم</p>
                  </div>
                </div>

                <div className="benefits-grid">
                  {benefits.map((benefit, index) => (
                    <div className="benefit-item" key={index}>
                      <CheckCircle2 size={15} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="details-card details-reveal">
              <div className="details-section-heading">
                <div className="details-section-icon">
                  <Building2 size={17} />
                </div>

                <div>
                  <h2>عن {companyName}</h2>
                  <p>معلومات عن الجهة الناشرة</p>
                </div>
              </div>

              <p className="details-description">
                {companyDescription ||
                  "لا تتوفر معلومات إضافية عن الجهة الناشرة حالياً."}
              </p>

              {companyId && (
                <Link
                  to={`/company/${companyId}`}
                  className="view-company-link"
                >
                  عرض صفحة الشركة
                  <ArrowLeft size={15} />
                </Link>
              )}
            </section>

            <section
              id="application-message"
              className="application-information"
            >
              <div className="application-information-icon">
                <Send size={20} />
              </div>

              <div>
                <h2>جاهز للتقديم؟</h2>

                <p>
                  راجع متطلبات الفرصة وتأكد من تحديث سيرتك الذاتية قبل التقديم.
                </p>
              </div>

              <Link
                to={`/opportunities/${opportunity.id}/apply`}
                className="application-bottom-button"
              >
                <Send size={18} />
                التقديم على الفرصة
              </Link>
            </section>
          </main>

          <aside className="opportunity-details-sidebar">
            <section className="match-card">
              <div className="match-card-header">
                <div>
                  <h2>مدى توافقك</h2>
                  <p>مقارنة ملفك مع متطلبات الفرصة</p>
                </div>

                <div className="match-circle">
                  <strong>{match}%</strong>
                  <span>توافق</span>
                </div>
              </div>

              <div className="match-progress">
                <span
                  style={{
                    width: `${Math.min(Math.max(match, 0), 100)}%`,
                  }}
                />
              </div>

              {matchingSkills.length > 0 && (
                <div className="match-group">
                  <div className="match-group-title">
                    <CheckCircle2 size={15} />
                    مهارات متوافقة
                  </div>

                  <div className="match-tags">
                    {matchingSkills.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {missingSkills.length > 0 && (
                <div className="match-group">
                  <div className="match-group-title missing">
                    <CircleAlert size={15} />
                    مهارات تحتاج إلى تطوير
                  </div>

                  <div className="match-tags missing-tags">
                    {missingSkills.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {learningTime && (
                <div className="learning-time">
                  <Clock3 size={15} />

                  <div>
                    <span>الوقت التقديري للتطوير</span>

                    <strong>{learningTime}</strong>
                  </div>
                </div>
              )}
            </section>

            <section className="apply-card">
              <div className="apply-card-info">
                <span>آخر موعد للتقديم</span>
                <strong>{deadline}</strong>
              </div>

              <button
                type="button"
                className={`save-details-button ${
                  isSaved ? "save-details-button-active" : ""
                }`}
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />

                {isSaved ? "تم حفظ الفرصة" : "حفظ الفرصة"}
              </button>
            </section>

            <section className="details-info-card">
              <h3>معلومات الفرصة</h3>

              <div className="details-info-row">
                <span>
                  <MapPin size={15} />
                  الموقع
                </span>

                <strong>{location}</strong>
              </div>

              <div className="details-info-row">
                <span>
                  <BriefcaseBusiness size={15} />
                  نوع العمل
                </span>

                <strong>{mode}</strong>
              </div>

              <div className="details-info-row">
                <span>
                  <CalendarDays size={15} />
                  الموعد النهائي
                </span>

                <strong>{deadline}</strong>
              </div>

              <div className="details-info-row">
                <span>
                  <Users size={15} />
                  الجهة
                </span>

                <strong>{companyName}</strong>
              </div>
            </section>

            <section className="cv-reminder">
              <FileText size={18} />

              <div>
                <strong>حدّث سيرتك الذاتية</strong>

                <p>السيرة المحدثة تساعدك على الحصول على تطابق أدق مع الفرص.</p>

                <Link to="/cv/upload">
                  تحديث السيرة
                  <ArrowLeft size={13} />
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </PageContainer>
  );
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split(/\n|•|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function formatPostedDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return `نُشرت في ${date.toLocaleDateString("ar-IQ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

export default OpportunityDetails;
