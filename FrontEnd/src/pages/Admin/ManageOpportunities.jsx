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

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";

import {
  getOpportunities,
  deleteOpportunity,
} from "../../services/opportunityService";

import "./ManageOpportunities.css";

const statusOptions = [
  "الكل",
  "منشورة",
  "قيد المراجعة",
  "متوقفة",
];

function ManageOpportunities() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadOpportunities = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getOpportunities();

        const data =
          response?.opportunities ||
          response?.data ||
          response?.results ||
          response;

        if (isMounted) {
          setOpportunities(
            Array.isArray(data) ? data : []
          );
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error?.message ||
              "تعذر تحميل الفرص."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOpportunities();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedOpportunities = useMemo(() => {
    return opportunities.map((opportunity) => ({
      ...opportunity,

      id:
        opportunity.id ||
        opportunity._id,

      title:
        opportunity.title ||
        opportunity.name ||
        "فرصة بدون عنوان",

      company:
        opportunity.company ||
        opportunity.company_name ||
        opportunity.company?.name ||
        "غير محدد",

      type:
        opportunity.type ||
        opportunity.type_name ||
        opportunity.opportunity_type ||
        "غير محدد",

      location:
        opportunity.location ||
        "غير محدد",

      applicants:
        opportunity.applicants ??
        opportunity.applicants_count ??
        opportunity.applications_count ??
        0,

      deadline:
        opportunity.deadline ||
        opportunity.application_deadline ||
        "غير محدد",

      status:
        opportunity.status ||
        "منشورة",
    }));
  }, [opportunities]);

  const filteredOpportunities =
    normalizedOpportunities.filter(
      (opportunity) => {
        const searchValue =
          search.trim().toLowerCase();

        const matchesSearch =
          !searchValue ||
          opportunity.title
            .toLowerCase()
            .includes(searchValue) ||
          opportunity.company
            .toLowerCase()
            .includes(searchValue);

        const matchesStatus =
          status === "الكل" ||
          opportunity.status === status;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  const totalOpportunities =
    normalizedOpportunities.length;

  const publishedOpportunities =
    normalizedOpportunities.filter(
      (opportunity) =>
        opportunity.status === "منشورة"
    ).length;

  const pendingOpportunities =
    normalizedOpportunities.filter(
      (opportunity) =>
        opportunity.status === "قيد المراجعة"
    ).length;

  const totalApplicants =
    normalizedOpportunities.reduce(
      (total, opportunity) =>
        total +
        Number(opportunity.applicants || 0),
      0
    );

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "هل أنت متأكد من حذف هذه الفرصة؟"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setError("");

    try {
      await deleteOpportunity(id);

      setOpportunities((previous) =>
        previous.filter(
          (opportunity) =>
            (opportunity.id ||
              opportunity._id) !== id
        )
      );
    } catch (error) {
      setError(
        error?.message ||
          "تعذر حذف الفرصة."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (id) => {
    navigate(`/opportunities/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/opportunities/${id}/edit`);
  };

  return (
    <PageContainer className="manage-opportunities-page">
      <div className="container">

        <section className="manage-page-header">
          <div>
            <span className="manage-eyebrow">
              إدارة المحتوى
            </span>

            <h1>
              إدارة الفرص
            </h1>

            <p>
              أضف وعدّل وراجع جميع الفرص المنشورة
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

        <section className="manage-stats">

          <div className="manage-stat">
            <div className="manage-stat-icon">
              <BriefcaseBusiness size={19} />
            </div>

            <div>
              <span>
                إجمالي الفرص
              </span>

              <strong>
                {totalOpportunities}
              </strong>
            </div>
          </div>

          <div className="manage-stat">
            <div className="manage-stat-icon manage-stat-green">
              <Eye size={19} />
            </div>

            <div>
              <span>
                الفرص المنشورة
              </span>

              <strong>
                {publishedOpportunities}
              </strong>
            </div>
          </div>

          <div className="manage-stat">
            <div className="manage-stat-icon manage-stat-orange">
              <PauseCircle size={19} />
            </div>

            <div>
              <span>
                قيد المراجعة
              </span>

              <strong>
                {pendingOpportunities}
              </strong>
            </div>
          </div>

          <div className="manage-stat">
            <div className="manage-stat-icon manage-stat-purple">
              <Users size={19} />
            </div>

            <div>
              <span>
                إجمالي المتقدمين
              </span>

              <strong>
                {totalApplicants}
              </strong>
            </div>
          </div>

        </section>

        <section className="manage-panel">

          <div className="manage-toolbar">

            <div className="manage-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="ابحث عن فرصة أو شركة..."
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
                {statusOptions.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>

              <ChevronDown size={15} />
            </div>

          </div>

          {error && (
            <div className="manage-empty">
              <BriefcaseBusiness size={34} />

              <h3>
                تعذر تنفيذ العملية
              </h3>

              <p>
                {error}
              </p>
            </div>
          )}

          <div className="manage-table-wrapper">

            {loading ? (
              <div className="manage-empty">
                <BriefcaseBusiness size={34} />

                <h3>
                  جارٍ تحميل الفرص...
                </h3>

                <p>
                  يرجى الانتظار حتى يتم تحميل البيانات.
                </p>
              </div>
            ) : (
              <>
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
                      (opportunity) => {

                        const opportunityId =
                          opportunity.id;

                        return (
                          <tr
                            key={
                              opportunityId
                            }
                          >

                            <td>
                              <div className="manage-opportunity-info">

                                <div className="manage-company-logo">
                                  <Building2 size={17} />
                                </div>

                                <div>
                                  <strong>
                                    {
                                      opportunity.title
                                    }
                                  </strong>

                                  <span>
                                    {
                                      opportunity.company
                                    }
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
                                {
                                  opportunity.location
                                }
                              </span>
                            </td>

                            <td>
                              <span className="manage-applicants">
                                <Users size={14} />

                                {
                                  opportunity.applicants
                                }
                              </span>
                            </td>

                            <td>
                              <span className="manage-deadline">
                                <CalendarDays size={14} />

                                {
                                  opportunity.deadline
                                }
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
                                {
                                  opportunity.status
                                }
                              </span>
                            </td>

                            <td>
                              <div className="manage-actions">

                                <button
                                  type="button"
                                  title="تعديل"
                                  onClick={() =>
                                    handleEdit(
                                      opportunityId
                                    )
                                  }
                                >
                                  <Edit3 size={15} />
                                </button>

                                <button
                                  type="button"
                                  title="عرض"
                                  onClick={() =>
                                    handleView(
                                      opportunityId
                                    )
                                  }
                                >
                                  <Eye size={15} />
                                </button>

                                <button
                                  type="button"
                                  title="حذف"
                                  disabled={
                                    deletingId ===
                                    opportunityId
                                  }
                                  onClick={() =>
                                    handleDelete(
                                      opportunityId
                                    )
                                  }
                                >
                                  <Trash2 size={15} />
                                </button>

                                <button
                                  type="button"
                                  title="المزيد"
                                >
                                  <MoreHorizontal
                                    size={17}
                                  />
                                </button>

                              </div>
                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

                {filteredOpportunities.length ===
                  0 && (
                  <div className="manage-empty">

                    <BriefcaseBusiness size={34} />

                    <h3>
                      لا توجد فرص مطابقة
                    </h3>

                    <p>
                      جرّب تغيير كلمة البحث أو الفلتر.
                    </p>

                  </div>
                )}

              </>
            )}

          </div>

          <div className="manage-table-footer">

            <span>
              عرض{" "}
              {filteredOpportunities.length}{" "}
              من{" "}
              {normalizedOpportunities.length}{" "}
              فرص
            </span>

            <div className="manage-pagination">

              <button
                type="button"
                disabled
              >
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