import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
  PauseCircle,
  BriefcaseBusiness,
  Building2,
  Users,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import "./ManageOpportunities.css";

const opportunitiesData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "شركة تقنية العراق",
    type: "وظيفة",
    location: "بغداد",
    applicants: 126,
    deadline: "30 سبتمبر 2026",
    status: "منشورة",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Zain Iraq",
    type: "وظيفة",
    location: "بغداد",
    applicants: 94,
    deadline: "5 أكتوبر 2026",
    status: "منشورة",
  },
  {
    id: 3,
    title: "منحة دراسية للماجستير",
    company: "برنامج المنح الدولي",
    type: "منحة",
    location: "دولي",
    applicants: 84,
    deadline: "12 أكتوبر 2026",
    status: "منشورة",
  },
  {
    id: 4,
    title: "Frontend Development Training",
    company: "Tech Academy",
    type: "تدريب",
    location: "البصرة",
    applicants: 52,
    deadline: "18 أكتوبر 2026",
    status: "قيد المراجعة",
  },
  {
    id: 5,
    title: "Iraq Hackathon 2026",
    company: "Innovation Hub",
    type: "مسابقة",
    location: "بغداد",
    applicants: 217,
    deadline: "25 أكتوبر 2026",
    status: "منشورة",
  },
  {
    id: 6,
    title: "Network Engineering Course",
    company: "Cisco Academy",
    type: "دورة",
    location: "أونلاين",
    applicants: 73,
    deadline: "1 نوفمبر 2026",
    status: "متوقفة",
  },
];

const statusOptions = [
  "الكل",
  "منشورة",
  "قيد المراجعة",
  "متوقفة",
];

function ManageOpportunities() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");

  const filteredOpportunities = opportunitiesData.filter(
    (opportunity) => {
      const matchesSearch =
        opportunity.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        opportunity.company
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "الكل" ||
        opportunity.status === status;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <PageContainer className="manage-opportunities-page">
      <div className="container">

        {/* Header */}
        <section className="manage-page-header">
          <div>
            <span className="manage-eyebrow">
              إدارة المحتوى
            </span>

            <h1>إدارة الفرص</h1>

            <p>
              أضيفي وعدّلي وراجعي جميع الفرص المنشورة
              على منصة فرصتي.
            </p>
          </div>

          <Link
            to="/admin/opportunities/new"
            className="manage-primary-button"
          >
            <Plus size={18} />
            إضافة فرصة
          </Link>
        </section>

        {/* Stats */}
        <section className="manage-stats">
          <div className="manage-stat">
            <div className="manage-stat-icon">
              <BriefcaseBusiness size={19} />
            </div>

            <div>
              <span>إجمالي الفرص</span>
              <strong>1,284</strong>
            </div>
          </div>

          <div className="manage-stat">
            <div className="manage-stat-icon manage-stat-green">
              <Eye size={19} />
            </div>

            <div>
              <span>الفرص المنشورة</span>
              <strong>1,142</strong>
            </div>
          </div>

          <div className="manage-stat">
            <div className="manage-stat-icon manage-stat-orange">
              <PauseCircle size={19} />
            </div>

            <div>
              <span>قيد المراجعة</span>
              <strong>37</strong>
            </div>
          </div>

          <div className="manage-stat">
            <div className="manage-stat-icon manage-stat-purple">
              <Users size={19} />
            </div>

            <div>
              <span>إجمالي المتقدمين</span>
              <strong>8,936</strong>
            </div>
          </div>
        </section>

        {/* Main Panel */}
        <section className="manage-panel">

          {/* Toolbar */}
          <div className="manage-toolbar">

            <div className="manage-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="ابحثي عن فرصة أو شركة..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="manage-filter">
              <SlidersHorizontal size={16} />

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                {statusOptions.map((option) => (
                  <option
                    key={option}
                    value={
                      option === "الكل"
                        ? "الكل"
                        : option
                    }
                  >
                    {option}
                  </option>
                ))}
              </select>

              <ChevronDown size={15} />
            </div>
          </div>

          {/* Table */}
          <div className="manage-table-wrapper">
            <table className="manage-table">
              <thead>
                <tr>
                  <th>الفرصة</th>
                  <th>النوع</th>
                  <th>الموقع</th>
                  <th>المتقدمون</th>
                  <th>آخر موعد</th>
                  <th>الحالة</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredOpportunities.map(
                  (opportunity) => (
                    <tr key={opportunity.id}>

                      <td>
                        <div className="manage-opportunity-info">
                          <div className="manage-company-logo">
                            <Building2 size={17} />
                          </div>

                          <div>
                            <strong>
                              {opportunity.title}
                            </strong>

                            <span>
                              {opportunity.company}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="manage-type">
                          {opportunity.type}
                        </span>
                      </td>

                      <td>
                        <span className="manage-location">
                          {opportunity.location}
                        </span>
                      </td>

                      <td>
                        <span className="manage-applicants">
                          <Users size={14} />
                          {opportunity.applicants}
                        </span>
                      </td>

                      <td>
                        <span className="manage-deadline">
                          <CalendarDays size={14} />
                          {opportunity.deadline}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`manage-status ${
                            opportunity.status ===
                            "منشورة"
                              ? "manage-status-success"
                              : opportunity.status ===
                                "قيد المراجعة"
                              ? "manage-status-warning"
                              : "manage-status-muted"
                          }`}
                        >
                          {opportunity.status}
                        </span>
                      </td>

                      <td>
                        <div className="manage-actions">
                          <button
                            type="button"
                            title="تعديل"
                          >
                            <Edit3 size={15} />
                          </button>

                          <button
                            type="button"
                            title="عرض"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            title="المزيد"
                          >
                            <MoreHorizontal size={17} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  )
                )}
              </tbody>
            </table>

            {filteredOpportunities.length === 0 && (
              <div className="manage-empty">
                <BriefcaseBusiness size={34} />

                <h3>
                  لاتوجد فرص مطابقة
                </h3>

                <p>
                  جرب تغيير كلمة البحث أو الفلتر.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="manage-table-footer">
            <span>
              عرض {filteredOpportunities.length} من{" "}
              {opportunitiesData.length} فرص
            </span>

            <div className="manage-pagination">
              <button type="button" disabled>
                السابق
              </button>

              <button
                type="button"
                className="manage-page-active"
              >
                1
              </button>

              <button type="button">
                2
              </button>

              <button type="button">
                3
              </button>

              <button type="button">
                التالي
              </button>
            </div>
          </div>

        </section>
      </div>
    </PageContainer>
  );
}

export default ManageOpportunities;