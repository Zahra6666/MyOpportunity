import {
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  Clock3,
  FileCheck2,
  MoreHorizontal,
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import "./AdminDashboard.css";

const stats = [
  {
    title: "إجمالي المستخدمين",
    value: "12,480",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "الفرص المنشورة",
    value: "1,284",
    change: "+8.2%",
    icon: BriefcaseBusiness,
  },
  {
    title: "الشركات المسجلة",
    value: "452",
    change: "+5.7%",
    icon: Building2,
  },
  {
    title: "طلبات التقديم",
    value: "8,936",
    change: "+14.3%",
    icon: FileCheck2,
  },
];

const recentOpportunities = [
  {
    id: 1,
    title: "Software Engineer",
    company: "شركة تقنية العراق",
    type: "وظيفة",
    status: "منشورة",
    applicants: 126,
  },
  {
    id: 2,
    title: "منحة دراسية للماجستير",
    company: "برنامج المنح الدولي",
    type: "منحة",
    status: "منشورة",
    applicants: 84,
  },
  {
    id: 3,
    title: "Frontend Development Training",
    company: "Tech Academy",
    type: "تدريب",
    status: "قيد المراجعة",
    applicants: 52,
  },
  {
    id: 4,
    title: "Iraq Hackathon 2026",
    company: "Innovation Hub",
    type: "مسابقة",
    status: "منشورة",
    applicants: 217,
  },
];

const pendingCompanies = [
  {
    name: "شركة البصرة الرقمية",
    email: "info@basradigital.iq",
    date: "منذ ساعتين",
  },
  {
    name: "Future Tech Iraq",
    email: "contact@futuretech.iq",
    date: "منذ 5 ساعات",
  },
  {
    name: "مؤسسة الشباب للتنمية",
    email: "info@youthdev.iq",
    date: "أمس",
  },
];

function AdminDashboard() {
  return (
    <PageContainer className="admin-page">
      <div className="container">
        {/* Header */}
        <section className="admin-header">
          <div>
            <span className="admin-eyebrow">لوحة الإدارة</span>

            <h1>مرحباً بك في لوحة التحكم</h1>

            <p>
              تابع أداء منصة فرصتي وأدر المستخدمين والفرص والشركات
              من مكان واحد.
            </p>
          </div>

          <div className="admin-header-actions">
            <Link
              to="/admin/opportunities"
              className="admin-primary-button"
            >
              <BriefcaseBusiness size={18} />
              إدارة الفرص
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="admin-stats">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article className="admin-stat-card" key={stat.title}>
                <div className="admin-stat-top">
                  <div className="admin-stat-icon">
                    <Icon size={21} />
                  </div>

                  <span className="admin-stat-change">
                    <TrendingUp size={14} />
                    {stat.change}
                  </span>
                </div>

                <div className="admin-stat-value">
                  {stat.value}
                </div>

                <div className="admin-stat-title">
                  {stat.title}
                </div>
              </article>
            );
          })}
        </section>

        {/* Main grid */}
        <section className="admin-content-grid">
          {/* Recent opportunities */}
          <div className="admin-panel admin-opportunities-panel">
            <div className="admin-panel-header">
              <div>
                <h2>آخر الفرص</h2>
                <p>أحدث الفرص المضافة إلى المنصة</p>
              </div>

              <Link to="/admin/opportunities">
                عرض الكل
                <ChevronLeft size={16} />
              </Link>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>الفرصة</th>
                    <th>النوع</th>
                    <th>الحالة</th>
                    <th>المتقدمون</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {recentOpportunities.map((opportunity) => (
                    <tr key={opportunity.id}>
                      <td>
                        <div className="admin-opportunity-name">
                          <div className="admin-company-icon">
                            <Building2 size={17} />
                          </div>

                          <div>
                            <strong>{opportunity.title}</strong>
                            <span>{opportunity.company}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="admin-type">
                          {opportunity.type}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`admin-status ${
                            opportunity.status === "منشورة"
                              ? "admin-status-success"
                              : "admin-status-warning"
                          }`}
                        >
                          {opportunity.status}
                        </span>
                      </td>

                      <td>
                        <span className="admin-applicants">
                          <Users size={15} />
                          {opportunity.applicants}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="admin-more-button"
                          aria-label="المزيد"
                        >
                          <MoreHorizontal size={19} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending companies */}
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h2>شركات بانتظار الموافقة</h2>
                <p>طلبات تسجيل جديدة</p>
              </div>

              <Link to="/admin/employers">
                عرض الكل
                <ChevronLeft size={16} />
              </Link>
            </div>

            <div className="admin-company-list">
              {pendingCompanies.map((company) => (
                <div
                  className="admin-company-request"
                  key={company.email}
                >
                  <div className="admin-request-icon">
                    <Building2 size={18} />
                  </div>

                  <div className="admin-request-info">
                    <strong>{company.name}</strong>
                    <span>{company.email}</span>
                    <small>
                      <Clock3 size={12} />
                      {company.date}
                    </small>
                  </div>

                  <button
                    type="button"
                    className="admin-review-button"
                  >
                    مراجعة
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="admin-quick-section">
          <div className="admin-section-heading">
            <div>
              <h2>إدارة المنصة</h2>
              <p>اختصارات للوصول إلى الأقسام الرئيسية</p>
            </div>
          </div>

          <div className="admin-quick-grid">
            <Link
              to="/admin/users"
              className="admin-quick-card"
            >
              <div className="admin-quick-icon">
                <Users size={21} />
              </div>

              <div>
                <strong>المستخدمون</strong>
                <span>إدارة الحسابات والصلاحيات</span>
              </div>

              <ChevronLeft size={18} />
            </Link>

            <Link
              to="/admin/employers"
              className="admin-quick-card"
            >
              <div className="admin-quick-icon">
                <Building2 size={21} />
              </div>

              <div>
                <strong>الشركات</strong>
                <span>مراجعة وإدارة الشركات</span>
              </div>

              <ChevronLeft size={18} />
            </Link>

            <Link
              to="/admin/opportunities"
              className="admin-quick-card"
            >
              <div className="admin-quick-icon">
                <BriefcaseBusiness size={21} />
              </div>

              <div>
                <strong>الفرص</strong>
                <span>إضافة وتعديل الفرص</span>
              </div>

              <ChevronLeft size={18} />
            </Link>

            <Link
              to="/admin/users"
              className="admin-quick-card"
            >
              <div className="admin-quick-icon">
                <UserCheck size={21} />
              </div>

              <div>
                <strong>طلبات المستخدمين</strong>
                <span>متابعة نشاط المستخدمين</span>
              </div>

              <ChevronLeft size={18} />
            </Link>
          </div>
        </section>

        {/* Bottom info */}
        <section className="admin-bottom-grid">
          <div className="admin-info-card">
            <div className="admin-info-icon">
              <UserPlus size={20} />
            </div>

            <div>
              <strong>المستخدمون الجدد هذا الشهر</strong>
              <span>1,486 مستخدم جديد</span>
            </div>

            <b>+18.4%</b>
          </div>

          <div className="admin-info-card">
            <div className="admin-info-icon">
              <FileCheck2 size={20} />
            </div>

            <div>
              <strong>طلبات تحتاج مراجعة</strong>
              <span>37 طلباً بانتظار المراجعة</span>
            </div>

            <b>37</b>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

export default AdminDashboard;