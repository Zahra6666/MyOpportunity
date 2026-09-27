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
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import { getOpportunities, getCategories, getTypes } from "../../services/opportunityService";
import "./ManageOpportunities.css";

const statusOptions = [
  "الكل",
  "منشورة",
  "قيد المراجعة",
  "متوقفة",
];

function ManageOpportunities() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");
  const [opportunities, setOpportunities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Opportunities, Categories, and Types from Backend
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [oppRes, catRes, typeRes] = await Promise.all([
          getOpportunities(),
          getCategories().catch(() => []),
          getTypes().catch(() => [])
        ]);

        const oppList = Array.isArray(oppRes?.data) ? oppRes.data : (Array.isArray(oppRes) ? oppRes : []);
        setOpportunities(oppList);

        const catList = Array.isArray(catRes?.data) ? catRes.data : (Array.isArray(catRes) ? catRes : []);
        setCategories(catList);

        const typeList = Array.isArray(typeRes?.data) ? typeRes.data : (Array.isArray(typeRes) ? typeRes : []);
        setTypes(typeList);
      } catch (err) {
        console.error("حدث خطأ أثناء جلب الفرص والتصنيفات:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const title = opportunity.title || opportunity.titleAr || "";
    const company = opportunity.company_name || opportunity.company || "";

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "الكل" ||
      (opportunity.status || "منشورة") === status;

    return matchesSearch && matchesStatus;
  });

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
              <strong>{opportunities.length || 1284}</strong>
            </div>
          </div>

          <div className="manage-stat">
            <div className="manage-stat-icon manage-stat-green">
              <Eye size={19} />
            </div>

            <div>
              <span>الفرص المنشورة</span>
              <strong>{opportunities.filter(o => (o.status || "منشورة") === "منشورة").length || 1142}</strong>
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
                    value={option}
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
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
                <Loader2 size={28} className="animate-spin" />
              </div>
            ) : (
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
                  {filteredOpportunities.map((opportunity) => (
                    <tr key={opportunity.id}>

                      <td>
                        <div className="manage-opportunity-info">
                          <div className="manage-company-logo">
                            <Building2 size={17} />
                          </div>

                          <div>
                            <strong>
                              {opportunity.title || opportunity.titleAr}
                            </strong>

                            <span>
                              {opportunity.company_name || opportunity.company || "غير حدد"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="manage-type">
                          {opportunity.type_name || opportunity.type || "وظيفة"}
                        </span>
                      </td>

                      <td>
                        <span className="manage-location">
                          {opportunity.location || opportunity.governorate || "العراق"}
                        </span>
                      </td>

                      <td>
                        <span className="manage-applicants">
                          <Users size={14} />
                          {opportunity.applicants_count || opportunity.applicants || 0}
                        </span>
                      </td>

                      <td>
                        <span className="manage-deadline">
                          <CalendarDays size={14} />
                          {opportunity.deadline || "غير محدد"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`manage-status ${
                            (opportunity.status || "منشورة") === "منشورة"
                              ? "manage-status-success"
                              : (opportunity.status) === "قيد المراجعة"
                              ? "manage-status-warning"
                              : "manage-status-muted"
                          }`}
                        >
                          {opportunity.status || "منشورة"}
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
                  ))}
                </tbody>
              </table>
            )}

            {!loading && filteredOpportunities.length === 0 && (
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
              {opportunities.length} فرص
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