import {
  ArrowRight,
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
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { useEffect, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/common/Button";

import {
  getOpportunityById,
  saveOpportunity,
  unsaveOpportunity,
} from "../../services/opportunityService";

import "./OpportunityDetails.css";

function OpportunityDetails() {
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadOpportunity = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getOpportunityById(id);

        const data =
          response?.opportunity ||
          response?.data ||
          response;

        if (isMounted) {
          setOpportunity(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error?.message ||
              "تعذر تحميل تفاصيل الفرصة."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      loadOpportunity();
    } else {
      setLoading(false);
      setError("معرّف الفرصة غير صالح.");
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSave = async () => {
    if (!id || saving) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (isSaved) {
        await unsaveOpportunity(id);
        setIsSaved(false);
      } else {
        await saveOpportunity(id);
        setIsSaved(true);
      }
    } catch (error) {
      setError(
        error?.message ||
          "تعذر تحديث حالة حفظ الفرصة."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageContainer className="opportunity-details-page">
        <div className="container">
          <div className="details-card">
            <p>
              جارٍ تحميل تفاصيل الفرصة...
            </p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (error || !opportunity) {
    return (
      <PageContainer className="opportunity-details-page">
        <div className="container">
          <div className="details-card">
            <p>
              {error ||
                "تعذر العثور على الفرصة المطلوبة."}
            </p>

            <Link to="/opportunities">
              العودة إلى الفرص
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  const matchingSkills =
    opportunity.matchingSkills ||
    opportunity.matching_skills ||
    [];

  const missingSkills =
    opportunity.missingSkills ||
    opportunity.missing_skills ||
    [];

  const responsibilities =
    opportunity.responsibilities || [];

  const requirements =
    opportunity.requirements || [];

  const benefits =
    opportunity.benefits || [];

  const match =
    opportunity.match ??
    opportunity.match_percentage ??
    0;

  const companyId =
    opportunity.companyId ||
    opportunity.company_id ||
    opportunity.company?.id ||
    "";

  const companyName =
    opportunity.company ||
    opportunity.company_name ||
    opportunity.company?.name ||
    "الجهة الناشرة";

  const title =
    opportunity.title ||
    opportunity.name ||
    "فرصة وظيفية";

  const titleEn =
    opportunity.titleEn ||
    opportunity.title_en ||
    "";

  const type =
    opportunity.type ||
    opportunity.type_name ||
    opportunity.opportunity_type ||
    "";

  const location =
    opportunity.location ||
    "";

  const mode =
    opportunity.mode ||
    opportunity.work_mode ||
    opportunity.work_type ||
    "";

  const salary =
    opportunity.salary ||
    "غير محدد";

  const deadline =
    opportunity.deadline ||
    opportunity.application_deadline ||
    "غير محدد";

  const posted =
    opportunity.posted ||
    opportunity.posted_at ||
    "";

  const description =
    opportunity.description ||
    opportunity.details ||
    "";

  const learningTime =
    opportunity.learningTime ||
    opportunity.learning_time ||
    "";

  const companyDescription =
    opportunity.companyDescription ||
    opportunity.company_description ||
    opportunity.company?.description ||
    "";

  return (
    <PageContainer className="opportunity-details-page">

      <div className="container">

        <div className="details-breadcrumb">

          <Link to="/">
            الرئيسية
          </Link>

          <span>/</span>

          <Link to="/opportunities">
            استكشف الفرص
          </Link>

          <span>/</span>

          <span>
            تفاصيل الفرصة
          </span>

        </div>

        <div className="opportunity-details-layout">

          <main className="opportunity-details-main">

            <section className="details-header-card">

              <div className="details-company-logo">
                <Building2 size={30} />
              </div>

              <div className="details-header-content">

                <div className="details-type-row">

                  <span className="details-type-badge">
                    {type}
                  </span>

                  <span className="details-posted">
                    {posted}
                  </span>

                </div>

                <h1>
                  {title}
                </h1>

                {titleEn && (
                  <p className="details-title-en">
                    {titleEn}
                  </p>
                )}

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

            <section className="details-card">

              <div className="details-section-heading">

                <div className="details-section-icon">
                  <FileText size={17} />
                </div>

                <div>
                  <h2>
                    عن الفرصة
                  </h2>

                  <p>
                    نبذة عن الوظيفة والدور المطلوب
                  </p>
                </div>

              </div>

              <p className="details-description">
                {description}
              </p>

            </section>

            {responsibilities.length > 0 && (
              <section className="details-card">

                <div className="details-section-heading">

                  <div className="details-section-icon">
                    <BriefcaseBusiness size={17} />
                  </div>

                  <div>
                    <h2>
                      المسؤوليات
                    </h2>

                    <p>
                      المهام الأساسية في هذه الفرصة
                    </p>
                  </div>

                </div>

                <ul className="details-list">

                  {responsibilities.map(
                    (item, index) => (
                      <li key={index}>
                        <CheckCircle2 size={16} />
                        <span>
                          {item}
                        </span>
                      </li>
                    )
                  )}

                </ul>

              </section>
            )}

            {requirements.length > 0 && (
              <section className="details-card">

                <div className="details-section-heading">

                  <div className="details-section-icon">
                    <GraduationCap size={17} />
                  </div>

                  <div>
                    <h2>
                      المتطلبات
                    </h2>

                    <p>
                      المهارات والخبرات المطلوبة
                    </p>
                  </div>

                </div>

                <ul className="details-list">

                  {requirements.map(
                    (item, index) => (
                      <li key={index}>
                        <CheckCircle2 size={16} />
                        <span>
                          {item}
                        </span>
                      </li>
                    )
                  )}

                </ul>

              </section>
            )}

            {benefits.length > 0 && (
              <section className="details-card">

                <div className="details-section-heading">

                  <div className="details-section-icon">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <h2>
                      المزايا
                    </h2>

                    <p>
                      ما توفره الجهة للمتقدم
                    </p>
                  </div>

                </div>

                <div className="benefits-grid">

                  {benefits.map(
                    (benefit, index) => (
                      <div
                        className="benefit-item"
                        key={index}
                      >
                        <CheckCircle2 size={15} />
                        <span>
                          {benefit}
                        </span>
                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            <section className="details-card">

              <div className="details-section-heading">

                <div className="details-section-icon">
                  <Building2 size={17} />
                </div>

                <div>
                  <h2>
                    عن {companyName}
                  </h2>

                  <p>
                    معلومات عن الجهة الناشرة
                  </p>
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

          </main>

          <aside className="opportunity-details-sidebar">

            <section className="match-card">

              <div className="match-card-header">

                <div>
                  <h2>
                    مدى توافقك
                  </h2>

                  <p>
                    مقارنة ملفك مع متطلبات الفرصة
                  </p>
                </div>

                <div className="match-circle">

                  <strong>
                    {match}%
                  </strong>

                  <span>
                    توافق
                  </span>

                </div>

              </div>

              <div className="match-progress">

                <span
                  style={{
                    width: `${match}%`,
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

                    {matchingSkills.map(
                      (skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      )
                    )}

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

                    {missingSkills.map(
                      (skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                </div>
              )}

              {learningTime && (
                <div className="learning-time">

                  <Clock3 size={15} />

                  <div>

                    <span>
                      الوقت التقديري للتطوير
                    </span>

                    <strong>
                      {learningTime}
                    </strong>

                  </div>

                </div>
              )}

            </section>

            <section className="apply-card">

              <div className="apply-card-info">

                <span>
                  آخر موعد للتقديم
                </span>

                <strong>
                  {deadline}
                </strong>

              </div>

              <Button
                variant="primary"
                className="apply-button"
              >
                التقديم على الفرصة
                <ArrowLeft size={17} />
              </Button>

              <button
                type="button"
                className="save-details-button"
                onClick={handleSave}
                disabled={saving}
                aria-label={
                  isSaved
                    ? "إلغاء حفظ الفرصة"
                    : "حفظ الفرصة"
                }
              >
                <Bookmark
                  size={17}
                  fill={
                    isSaved
                      ? "currentColor"
                      : "none"
                  }
                />

                {saving
                  ? "جارٍ الحفظ..."
                  : isSaved
                  ? "إلغاء حفظ الفرصة"
                  : "حفظ الفرصة"}
              </button>

            </section>

            <section className="details-info-card">

              <h3>
                معلومات الفرصة
              </h3>

              <div className="details-info-row">

                <span>
                  <MapPin size={15} />
                  الموقع
                </span>

                <strong>
                  {location}
                </strong>

              </div>

              <div className="details-info-row">

                <span>
                  <BriefcaseBusiness size={15} />
                  نوع العمل
                </span>

                <strong>
                  {mode}
                </strong>

              </div>

              <div className="details-info-row">

                <span>
                  <Users size={15} />
                  الراتب
                </span>

                <strong>
                  {salary}
                </strong>

              </div>

            </section>

            <section className="cv-reminder">

              <FileText size={18} />

              <div>

                <strong>
                  حدّث سيرتك الذاتية
                </strong>

                <p>
                  السيرة المحدثة تساعدك على الحصول
                  على تطابق أدق مع الفرص.
                </p>

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

export default OpportunityDetails;