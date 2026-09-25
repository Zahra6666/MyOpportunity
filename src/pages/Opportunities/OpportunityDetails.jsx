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
import { Link, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/common/Button";

import "./OpportunityDetails.css";

function OpportunityDetails() {
  const { id } = useParams();

  // Temporary frontend data.
  // Later this will come from opportunityService / Backend API.
  const opportunity = {
    id: id || "1",

    title: "Frontend Developer",
    titleEn: "Frontend Developer",

    company: "شركة تقنية العراق",
    companyId: "company-1",

    type: "وظيفة",
    location: "بغداد، العراق",
    mode: "دوام كامل",

    salary: "حسب الخبرة",
    deadline: "15 أكتوبر 2026",

    posted: "منشورة منذ 4 أيام",

    description:
      "نبحث عن مطور Frontend للانضمام إلى فريقنا التقني والمساهمة في تطوير واجهات ويب حديثة وسهلة الاستخدام. سيكون المرشح مسؤولاً عن تحويل التصاميم إلى واجهات عملية ومتجاوبة والعمل مع فريق التطوير لتحسين تجربة المستخدم.",

    match: 92,

    matchingSkills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
    ],

    missingSkills: [
      "TypeScript",
      "Unit Testing",
    ],

    learningTime: "2 - 4 أسابيع",

    responsibilities: [
      "تطوير واجهات ويب متجاوبة وسهلة الاستخدام.",
      "تحويل التصاميم إلى مكونات React قابلة لإعادة الاستخدام.",
      "التعاون مع المصممين والمطورين ضمن فريق العمل.",
      "تحسين أداء وتجربة المستخدم.",
      "المشاركة في مراجعة واختبار الكود.",
    ],

    requirements: [
      "معرفة جيدة بـ HTML و CSS.",
      "خبرة في JavaScript.",
      "معرفة أساسية أو جيدة بـ React.",
      "القدرة على استخدام Git و GitHub.",
      "القدرة على العمل ضمن فريق.",
    ],

    benefits: [
      "بيئة عمل مهنية.",
      "فرص للتعلم والتطور.",
      "تدريب عملي أثناء العمل.",
      "تأمين صحي حسب سياسة الشركة.",
    ],

    companyDescription:
      "شركة تقنية عراقية تعمل في مجال الحلول الرقمية وتطوير المنتجات والخدمات التقنية، وتركز على دعم الكفاءات المحلية وبناء فرق تقنية متخصصة.",
  };

  return (
    <PageContainer className="opportunity-details-page">

      <div className="container">

        {/* Breadcrumb */}

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


        {/* Main Grid */}

        <div className="opportunity-details-layout">

          {/* Main Content */}

          <main className="opportunity-details-main">

            {/* Header */}

            <section className="details-header-card">

              <div className="details-company-logo">
                <Building2 size={30} />
              </div>

              <div className="details-header-content">

                <div className="details-type-row">

                  <span className="details-type-badge">
                    {opportunity.type}
                  </span>

                  <span className="details-posted">
                    {opportunity.posted}
                  </span>

                </div>

                <h1>
                  {opportunity.title}
                </h1>

                <p className="details-title-en">
                  {opportunity.titleEn}
                </p>

                <Link
                  to={`/company/${opportunity.companyId}`}
                  className="details-company-link"
                >
                  <Building2 size={15} />
                  {opportunity.company}
                  <ExternalLink size={13} />
                </Link>

                <div className="details-meta">

                  <span>
                    <MapPin size={15} />
                    {opportunity.location}
                  </span>

                  <span>
                    <BriefcaseBusiness size={15} />
                    {opportunity.mode}
                  </span>

                  <span>
                    <CalendarDays size={15} />
                    آخر موعد: {opportunity.deadline}
                  </span>

                </div>

              </div>

            </section>


            {/* Description */}

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
                {opportunity.description}
              </p>

            </section>


            {/* Responsibilities */}

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

                {opportunity.responsibilities.map(
                  (item, index) => (
                    <li key={index}>
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </li>
                  )
                )}

              </ul>

            </section>


            {/* Requirements */}

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

                {opportunity.requirements.map(
                  (item, index) => (
                    <li key={index}>
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </li>
                  )
                )}

              </ul>

            </section>


            {/* Benefits */}

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

                {opportunity.benefits.map(
                  (benefit, index) => (
                    <div
                      className="benefit-item"
                      key={index}
                    >
                      <CheckCircle2 size={15} />
                      <span>{benefit}</span>
                    </div>
                  )
                )}

              </div>

            </section>


            {/* Company */}

            <section className="details-card">

              <div className="details-section-heading">

                <div className="details-section-icon">
                  <Building2 size={17} />
                </div>

                <div>
                  <h2>
                    عن {opportunity.company}
                  </h2>

                  <p>
                    معلومات عن الجهة الناشرة
                  </p>
                </div>

              </div>

              <p className="details-description">
                {opportunity.companyDescription}
              </p>

              <Link
                to={`/company/${opportunity.companyId}`}
                className="view-company-link"
              >
                عرض صفحة الشركة
                <ArrowLeft size={15} />
              </Link>

            </section>

          </main>


          {/* Sidebar */}

          <aside className="opportunity-details-sidebar">

            {/* Match Card */}

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
                    {opportunity.match}%
                  </strong>

                  <span>
                    توافق
                  </span>
                </div>

              </div>


              <div className="match-progress">

                <span
                  style={{
                    width: `${opportunity.match}%`,
                  }}
                />

              </div>


              {/* Matching */}

              <div className="match-group">

                <div className="match-group-title">
                  <CheckCircle2 size={15} />
                  مهارات متوافقة
                </div>

                <div className="match-tags">

                  {opportunity.matchingSkills.map(
                    (skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>


              {/* Missing */}

              <div className="match-group">

                <div className="match-group-title missing">
                  <CircleAlert size={15} />
                  مهارات تحتاجين تطويرها
                </div>

                <div className="match-tags missing-tags">

                  {opportunity.missingSkills.map(
                    (skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>


              <div className="learning-time">

                <Clock3 size={15} />

                <div>
                  <span>
                    الوقت التقديري للتطوير
                  </span>

                  <strong>
                    {opportunity.learningTime}
                  </strong>
                </div>

              </div>

            </section>


            {/* Apply */}

            <section className="apply-card">

              <div className="apply-card-info">

                <span>
                  آخر موعد للتقديم
                </span>

                <strong>
                  {opportunity.deadline}
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
              >
                <Bookmark size={17} />
                حفظ الفرصة
              </button>

            </section>


            {/* Opportunity Info */}

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
                  {opportunity.location}
                </strong>

              </div>

              <div className="details-info-row">

                <span>
                  <BriefcaseBusiness size={15} />
                  نوع العمل
                </span>

                <strong>
                  {opportunity.mode}
                </strong>

              </div>

              <div className="details-info-row">

                <span>
                  <Users size={15} />
                  الراتب
                </span>

                <strong>
                  {opportunity.salary}
                </strong>

              </div>

            </section>


            {/* CV Reminder */}

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