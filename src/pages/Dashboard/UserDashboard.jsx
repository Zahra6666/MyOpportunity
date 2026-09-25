import {
  ArrowLeft,
  ArrowUpLeft,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  MoreHorizontal,
  Video,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Badge from "../../components/common/Badge";

import "./UserDashboard.css";

function UserDashboard() {
  const stats = [
    {
      label: "إجمالي التقديمات",
      value: "12",
      change: "+3",
      description: "هذا الشهر",
      icon: FileText,
      type: "blue",
    },
    {
      label: "قيد المراجعة",
      value: "5",
      change: "+2",
      description: "طلبات نشطة",
      icon: Clock3,
      type: "orange",
    },
    {
      label: "المقابلات",
      value: "3",
      change: "+1",
      description: "مقابلات قادمة",
      icon: Video,
      type: "purple",
    },
    {
      label: "العروض",
      value: "1",
      change: "+1",
      description: "عرض متاح",
      icon: CheckCircle2,
      type: "green",
    },
  ];

  const applications = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "شركة تقنية العراق",
      location: "بغداد",
      date: "24 سبتمبر 2026",
      status: "المقابلة التقنية",
      statusType: "interview",
      meeting: true,
    },
    {
      id: 2,
      title: "Software Engineer Intern",
      company: "Zain Iraq",
      location: "بغداد",
      date: "21 سبتمبر 2026",
      status: "قيد مراجعة المستندات",
      statusType: "review",
      meeting: false,
    },
    {
      id: 3,
      title: "IT Support Trainee",
      company: "شركة الاتصالات",
      location: "البصرة",
      date: "18 سبتمبر 2026",
      status: "تم التقديم",
      statusType: "applied",
      meeting: false,
    },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Junior React Developer",
      company: "شركة البرمجيات العراقية",
      location: "بغداد",
      type: "وظيفة",
      match: 94,
      deadline: "باقي 5 أيام",
    },
    {
      id: 2,
      title: "Full Stack Development Training",
      company: "Tech Academy",
      location: "البصرة",
      type: "تدريب",
      match: 89,
      deadline: "باقي 8 أيام",
    },
    {
      id: 3,
      title: "Iraq Youth Innovation Program",
      company: "Innovation Hub",
      location: "بغداد",
      type: "مسابقة",
      match: 86,
      deadline: "باقي 12 يوم",
    },
  ];

  const savedOpportunities = [
    {
      id: 1,
      title: "Backend Developer",
      company: "Digital Solutions",
      deadline: "ينتهي بعد يومين",
      match: 91,
    },
    {
      id: 2,
      title: "Network Engineer Trainee",
      company: "Iraq Networks",
      deadline: "ينتهي بعد 4 أيام",
      match: 84,
    },
  ];

  return (
    <PageContainer className="dashboard-page">
      <div className="container dashboard-container">

        {/* Header */}
        <section className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">
              لوحة التحكم
            </span>

            <h1>
              أهلاً حوراء، شنو أخبار فرصك؟
            </h1>

            <p>
              تابع تقديماتك واكتشف الفرص الجديدة المناسبة إلك.
            </p>
          </div>

          <Link
            to="/opportunities"
            className="dashboard-explore-btn"
          >
            استكشف الفرص
            <ArrowLeft size={18} />
          </Link>
        </section>

        {/* Stats */}
        <section className="dashboard-stats">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                className="dashboard-stat-card"
                key={stat.label}
              >
                <div className={`dashboard-stat-icon ${stat.type}`}>
                  <Icon size={21} />
                </div>

                <div className="dashboard-stat-content">
                  <span>{stat.label}</span>

                  <div className="dashboard-stat-value">
                    <strong>{stat.value}</strong>

                    <small>
                      <ArrowUpLeft size={12} />
                      {stat.change}
                    </small>
                  </div>

                  <p>{stat.description}</p>
                </div>
              </article>
            );
          })}
        </section>

        {/* Main grid */}
        <div className="dashboard-main-grid">

          {/* Applications */}
          <section className="dashboard-section applications-section">
            <div className="section-heading">
              <div>
                <h2>تقديماتي الأخيرة</h2>
                <p>
                  آخر الفرص التي قدمت عليها
                </p>
              </div>

              <Link to="/applications">
                عرض الكل
                <ArrowLeft size={16} />
              </Link>
            </div>

            <div className="applications-list">
              {applications.map((application) => (
                <article
                  className="application-item"
                  key={application.id}
                >
                  <div className="application-company-logo">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div className="application-info">
                    <Link
                      to={`/opportunities/${application.id}`}
                      className="application-title"
                    >
                      {application.title}
                    </Link>

                    <span className="application-company">
                      {application.company}
                    </span>

                    <div className="application-meta">
                      <span>
                        <MapPin size={14} />
                        {application.location}
                      </span>

                      <span>
                        <CalendarDays size={14} />
                        {application.date}
                      </span>
                    </div>
                  </div>

                  <div className="application-status-column">
                    <Badge variant={application.statusType}>
                      {application.status}
                    </Badge>

                    {application.meeting && (
                      <a
                        href="#meeting"
                        className="meeting-link"
                      >
                        <Video size={14} />
                        رابط المقابلة
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    className="application-more"
                    aria-label="المزيد"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* Profile readiness */}
          <aside className="dashboard-sidebar">

            <section className="profile-readiness-card">
              <div className="readiness-top">
                <div>
                  <span>جاهزية الملف الشخصي</span>
                  <strong>82%</strong>
                </div>

                <div className="readiness-circle">
                  <svg viewBox="0 0 42 42">
                    <circle
                      className="readiness-bg"
                      cx="21"
                      cy="21"
                      r="17"
                    />
                    <circle
                      className="readiness-progress"
                      cx="21"
                      cy="21"
                      r="17"
                    />
                  </svg>

                  <span>82%</span>
                </div>
              </div>

              <div className="readiness-bar">
                <span style={{ width: "82%" }} />
              </div>

              <p>
                ملفك قريب من الاكتمال. أضف خبراتك
                ومشاريعك حتى تحصل على فرص أكثر.
              </p>

              <Link to="/profile">
                تحسين الملف الشخصي
                <ArrowLeft size={16} />
              </Link>
            </section>

            <section className="quick-actions-card">
              <div className="section-heading compact">
                <div>
                  <h2>إجراءات سريعة</h2>
                </div>
              </div>

              <Link to="/cv/upload" className="quick-action">
                <span className="quick-action-icon">
                  <FileText size={18} />
                </span>

                <span>
                  <strong>تحديث السيرة الذاتية</strong>
                  <small>آخر تحديث قبل 12 يوم</small>
                </span>

                <ArrowLeft size={16} />
              </Link>

              <Link to="/saved" className="quick-action">
                <span className="quick-action-icon">
                  <Bookmark size={18} />
                </span>

                <span>
                  <strong>الفرص المحفوظة</strong>
                  <small>8 فرص محفوظة</small>
                </span>

                <ArrowLeft size={16} />
              </Link>
            </section>

          </aside>
        </div>

        {/* Recommendations */}
        <section className="dashboard-section recommendations-section">
          <div className="section-heading">
            <div>
              <h2>فرص مناسبة إلك</h2>
              <p>
                فرص تم اختيارها بناءً على مهاراتك واهتماماتك.
              </p>
            </div>

            <Link to="/opportunities">
              استكشاف المزيد
              <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="recommendations-grid">
            {recommendations.map((opportunity) => (
              <article
                className="recommendation-card"
                key={opportunity.id}
              >
                <div className="recommendation-card-top">
                  <div className="recommendation-logo">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <button
                    type="button"
                    className="recommendation-save"
                    aria-label="حفظ الفرصة"
                  >
                    <Bookmark size={18} />
                  </button>
                </div>

                <Badge variant="type">
                  {opportunity.type}
                </Badge>

                <Link
                  to={`/opportunities/${opportunity.id}`}
                  className="recommendation-title"
                >
                  {opportunity.title}
                </Link>

                <p className="recommendation-company">
                  {opportunity.company}
                </p>

                <div className="recommendation-location">
                  <MapPin size={14} />
                  {opportunity.location}
                </div>

                <div className="recommendation-bottom">
                  <div className="recommendation-match">
                    <span>{opportunity.match}%</span>
                    <small>تطابق</small>
                  </div>

                  <span className="recommendation-deadline">
                    <Clock3 size={14} />
                    {opportunity.deadline}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Saved opportunities */}
        <section className="dashboard-section saved-section">
          <div className="section-heading">
            <div>
              <h2>لا تفوت هده الفرصة</h2>
              <p>
                فرص محفوظة اقترب موعد إغلاق التقديم عليها.
              </p>
            </div>

            <Link to="/saved">
              كل المحفوظات
              <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="saved-deadline-list">
            {savedOpportunities.map((opportunity) => (
              <article
                className="saved-deadline-item"
                key={opportunity.id}
              >
                <div className="saved-deadline-icon">
                  <Bookmark size={19} />
                </div>

                <div className="saved-deadline-info">
                  <Link
                    to={`/opportunities/${opportunity.id}`}
                  >
                    {opportunity.title}
                  </Link>

                  <span>
                    {opportunity.company}
                  </span>
                </div>

                <div className="saved-deadline-match">
                  {opportunity.match}%
                  <small>تطابق</small>
                </div>

                <div className="saved-deadline-warning">
                  <Clock3 size={15} />
                  {opportunity.deadline}
                </div>

                <Link
                  to={`/opportunities/${opportunity.id}`}
                  className="saved-view-btn"
                >
                  عرض
                </Link>
              </article>
            ))}
          </div>
        </section>

      </div>
    </PageContainer>
  );
}

export default UserDashboard;