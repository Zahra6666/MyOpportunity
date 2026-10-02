import {
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Edit3,
  Eye,
  Building2,
  Building,
  Clock3,
  Ban,
  UserPlus,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";

import {
  getAllCompaniesForAdmin,
  deleteCompany,
  approveCompany,
  rejectCompany,
} from "../../services/companyService";

import "./ManageEmployers.css";

const statusOptions = ["الكل", "معتمد", "بانتظار المراجعة", "مرفوض"];

function normalizeStatus(status) {
  if (!status) {
    return "بانتظار المراجعة";
  }

  const value = String(status).toLowerCase();

  if (value === "approved" || value === "active" || value === "معتمد") {
    return "معتمد";
  }

  if (value === "pending" || value === "بانتظار المراجعة") {
    return "بانتظار المراجعة";
  }

  if (value === "rejected" || value === "مرفوض") {
    return "مرفوض";
  }

  if (value === "suspended" || value === "blocked" || value === "معلّق") {
    return "معلّق";
  }

  return status;
}

function normalizeCompany(company) {
  return {
    id: company?.id ?? company?._id,

    company:
      company?.name ||
      company?.company_name ||
      company?.companyName ||
      company?.title ||
      "شركة غير معروفة",

    email:
      company?.email || company?.contact_email || company?.contactEmail || "—",

    industry:
      company?.industry ||
      company?.industry_name ||
      company?.industryName ||
      company?.sector ||
      "—",

    status: normalizeStatus(
      company?.status || company?.approval_status || company?.approvalStatus,
    ),

    opportunities:
      company?.opportunities_count ??
      company?.opportunitiesCount ??
      company?.opportunities ??
      null,

    joined:
      company?.created_at ||
      company?.createdAt ||
      company?.joined_at ||
      company?.joinedAt,
  };
}

function extractCompanies(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.companies)) {
    return response.companies;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.results)) {
    return response.results;
  }

  return [];
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return String(dateValue);
  }

  return date.toLocaleDateString("ar-IQ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ManageEmployers() {
  const navigate = useNavigate();

  const [employers, setEmployers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    setLoading(true);
    setError("");

    try {
      const response = await getAllCompaniesForAdmin();

      const companies = extractCompanies(response);

      setEmployers(companies.map(normalizeCompany));
    } catch (requestError) {
      setError(requestError?.message || "تعذر تحميل الشركات.");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(company) {
    if (!company?.id) {
      return;
    }

    const confirmed = window.confirm(
      `هل أنت متأكد من اعتماد الشركة "${company.company}"؟`,
    );

    if (!confirmed) {
      return;
    }

    setActionId(company.id);
    setError("");

    try {
      await approveCompany(company.id);

      setEmployers((currentEmployers) =>
        currentEmployers.map((currentCompany) =>
          currentCompany.id === company.id
            ? {
                ...currentCompany,
                status: "معتمد",
              }
            : currentCompany,
        ),
      );
    } catch (requestError) {
      setError(requestError?.message || "تعذر اعتماد الشركة.");
    } finally {
      setActionId(null);
    }
  }

  async function handleReject(company) {
    if (!company?.id) {
      return;
    }

    const confirmed = window.confirm(
      `هل أنت متأكد من رفض الشركة "${company.company}"؟`,
    );

    if (!confirmed) {
      return;
    }

    setActionId(company.id);
    setError("");

    try {
      await rejectCompany(company.id);

      setEmployers((currentEmployers) =>
        currentEmployers.map((currentCompany) =>
          currentCompany.id === company.id
            ? {
                ...currentCompany,
                status: "مرفوض",
              }
            : currentCompany,
        ),
      );
    } catch (requestError) {
      setError(requestError?.message || "تعذر رفض الشركة.");
    } finally {
      setActionId(null);
    }
  }

  async function handleDelete(company) {
    if (!company?.id) {
      return;
    }

    const confirmed = window.confirm(
      `هل أنت متأكد من حذف الشركة "${company.company}"؟`,
    );

    if (!confirmed) {
      return;
    }

    setActionId(company.id);
    setError("");

    try {
      await deleteCompany(company.id);

      setEmployers((currentEmployers) =>
        currentEmployers.filter(
          (currentCompany) => currentCompany.id !== company.id,
        ),
      );
    } catch (requestError) {
      setError(requestError?.message || "تعذر حذف الشركة.");
    } finally {
      setActionId(null);
    }
  }

  function handleMoreAction(company) {
    if (!company?.id) {
      return;
    }

    if (company.status === "بانتظار المراجعة") {
      handleApprove(company);
      return;
    }

    if (company.status === "معتمد") {
      handleReject(company);
      return;
    }

    handleDelete(company);
  }

  const filteredEmployers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return employers.filter((employer) => {
      const company = String(employer.company).toLowerCase();

      const email = String(employer.email).toLowerCase();

      const industry = String(employer.industry).toLowerCase();

      const matchesSearch =
        !searchValue ||
        company.includes(searchValue) ||
        email.includes(searchValue) ||
        industry.includes(searchValue);

      const matchesStatus = status === "الكل" || employer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [employers, search, status]);

  const totalCompanies = employers.length;

  const approvedCompanies = employers.filter(
    (employer) => employer.status === "معتمد",
  ).length;

  const pendingCompanies = employers.filter(
    (employer) => employer.status === "بانتظار المراجعة",
  ).length;

  const suspendedCompanies = employers.filter(
    (employer) => employer.status === "معلّق" || employer.status === "مرفوض",
  ).length;

  return (
    <PageContainer className="manage-employers-page">
      <div className="container">
        {/* Header */}
        <section className="manage-employers-header">
          <div>
            <span className="manage-employers-eyebrow">إدارة الجهات</span>

            <h1>إدارة الشركات وأصحاب العمل</h1>

            <p>
              متابعة الشركات المسجلة ومراجعة طلبات اعتمادها وإدارة الفرص التي
              تنشرها على منصة فرصتي.
            </p>
          </div>

          <button
            type="button"
            className="manage-employers-primary"
            onClick={() => navigate("/admin/employers/new")}
          >
            <UserPlus size={18} />
            إضافة شركة
          </button>
        </section>

        {/* Error */}
        {error && <div className="manage-employers-error">{error}</div>}

        {/* Stats */}
        <section className="manage-employers-stats">
          <div className="manage-employers-stat">
            <div className="manage-employers-stat-icon">
              <Building2 size={19} />
            </div>

            <div>
              <span>إجمالي الشركات</span>

              <strong>{loading ? "..." : totalCompanies}</strong>
            </div>
          </div>

          <div className="manage-employers-stat">
            <div className="manage-employers-stat-icon employers-green">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <span>الشركات المعتمدة</span>

              <strong>{loading ? "..." : approvedCompanies}</strong>
            </div>
          </div>

          <div className="manage-employers-stat">
            <div className="manage-employers-stat-icon employers-orange">
              <Clock3 size={19} />
            </div>

            <div>
              <span>بانتظار المراجعة</span>

              <strong>{loading ? "..." : pendingCompanies}</strong>
            </div>
          </div>

          <div className="manage-employers-stat">
            <div className="manage-employers-stat-icon employers-red">
              <Ban size={19} />
            </div>

            <div>
              <span>الشركات المرفوضة</span>

              <strong>{loading ? "..." : suspendedCompanies}</strong>
            </div>
          </div>
        </section>

        {/* Main panel */}
        <section className="manage-employers-panel">
          {/* Toolbar */}
          <div className="manage-employers-toolbar">
            <div className="manage-employers-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="ابحث باسم الشركة أو البريد أو المجال..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="manage-employers-filter">
              <SlidersHorizontal size={16} />

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <ChevronDown size={15} />
            </div>
          </div>

          {/* Table */}
          <div className="manage-employers-table-wrapper">
            {loading ? (
              <div className="manage-employers-empty">
                <Building size={35} />

                <h3>جارٍ تحميل الشركات...</h3>

                <p>يتم جلب بيانات الشركات من الخادم.</p>
              </div>
            ) : (
              <>
                <table className="manage-employers-table">
                  <thead>
                    <tr>
                      <th>الشركة</th>
                      <th>المجال</th>
                      <th>الحالة</th>
                      <th>الفرص المنشورة</th>
                      <th>تاريخ التسجيل</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredEmployers.map((employer) => (
                      <tr key={employer.id}>
                        <td>
                          <div className="manage-employer-info">
                            <div className="manage-employer-avatar">
                              <Building2 size={19} />
                            </div>

                            <div>
                              <strong>{employer.company}</strong>

                              <span>{employer.email}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="manage-employer-industry">
                            {employer.industry}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`manage-employer-status ${
                              employer.status === "معتمد"
                                ? "employer-status-approved"
                                : employer.status === "بانتظار المراجعة"
                                  ? "employer-status-pending"
                                  : "employer-status-suspended"
                            }`}
                          >
                            {employer.status}
                          </span>
                        </td>

                        <td>
                          <span className="manage-employer-opportunities">
                            {employer.opportunities ?? "—"}
                          </span>
                        </td>

                        <td>
                          <span className="manage-employer-date">
                            {formatDate(employer.joined)}
                          </span>
                        </td>

                        <td>
                          <div className="manage-employer-actions">
                            {/* عرض */}
                            <button
                              type="button"
                              title="عرض الشركة"
                              disabled={!employer.id}
                              onClick={() =>
                                navigate(`/companies/${employer.id}`)
                              }
                            >
                              <Eye size={15} />
                            </button>

                            {/* تعديل */}
                            <button
                              type="button"
                              title="تعديل"
                              disabled={
                                !employer.id || actionId === employer.id
                              }
                              onClick={() =>
                                navigate(`/admin/employers/${employer.id}/edit`)
                              }
                            >
                              <Edit3 size={15} />
                            </button>

                            {/* إجراء حسب الحالة */}
                            <button
                              type="button"
                              title={
                                employer.status === "بانتظار المراجعة"
                                  ? "اعتماد الشركة"
                                  : employer.status === "معتمد"
                                    ? "رفض الشركة"
                                    : "حذف الشركة"
                              }
                              disabled={
                                !employer.id || actionId === employer.id
                              }
                              onClick={() => handleMoreAction(employer)}
                            >
                              <MoreHorizontal size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredEmployers.length === 0 && (
                  <div className="manage-employers-empty">
                    <Building size={35} />

                    <h3>لا توجد شركات مطابقة</h3>

                    <p>جرّب تغيير البحث أو الفلتر.</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="manage-employers-footer">
            <span>
              عرض {filteredEmployers.length} من {employers.length} شركات
            </span>

            <div className="manage-employers-pagination">
              <button type="button" disabled>
                السابق
              </button>

              <button type="button" className="employers-page-active">
                1
              </button>

              <button type="button" disabled>
                التالي
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

export default ManageEmployers;
