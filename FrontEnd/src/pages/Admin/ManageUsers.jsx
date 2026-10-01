import {
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Edit3,
  Eye,
  UserCheck,
  UserX,
  Users,
  UserPlus,
  FileCheck2,
  ChevronDown,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import { getUsers, deleteUser } from "../../services/userService";
import "./ManageUsers.css";

const statusOptions = [
  "الكل",
  "نشط",
  "معلّق",
  "محظور",
];

function normalizeStatus(status) {
  if (!status) {
    return "معلّق";
  }

  const value = String(status).toLowerCase();

  if (
    value === "active" ||
    value === "نشط" ||
    value === "approved"
  ) {
    return "نشط";
  }

  if (
    value === "blocked" ||
    value === "banned" ||
    value === "محظور"
  ) {
    return "محظور";
  }

  if (
    value === "pending" ||
    value === "معلّق" ||
    value === "suspended"
  ) {
    return "معلّق";
  }

  return status;
}

function normalizeRole(role) {
  if (!role) {
    return "مستخدم";
  }

  const value = String(role).toLowerCase();

  if (
    value === "admin" ||
    value === "administrator" ||
    value === "مشرف"
  ) {
    return "مشرف";
  }

  if (
    value === "company" ||
    value === "employer" ||
    value === "شركة"
  ) {
    return "شركة";
  }

  return "مستخدم";
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

function normalizeUser(user) {
  return {
    id: user?.id ?? user?._id,
    name:
      user?.name ||
      user?.full_name ||
      user?.fullName ||
      user?.username ||
      "مستخدم",
    email: user?.email || "—",
    role: normalizeRole(
      user?.role ||
        user?.user_role ||
        user?.userRole
    ),
    status: normalizeStatus(
      user?.status ||
        user?.account_status ||
        user?.accountStatus
    ),
    applications:
      user?.applications_count ??
      user?.applicationsCount ??
      user?.applications ??
      null,
    joined:
      user?.created_at ||
      user?.createdAt ||
      user?.joined_at ||
      user?.joinedAt,
  };
}

function extractUsers(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.users)) {
    return response.users;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.results)) {
    return response.results;
  }

  return [];
}

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const response = await getUsers();

      const usersList = extractUsers(response);

      setUsers(usersList.map(normalizeUser));
    } catch (requestError) {
      setError(
        requestError?.message ||
          "تعذر تحميل المستخدمين."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(user) {
    if (!user?.id) {
      return;
    }

    const confirmed = window.confirm(
      `هل أنت متأكد من حذف المستخدم "${user.name}"؟`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(user.id);
    setError("");

    try {
      await deleteUser(user.id);

      setUsers((currentUsers) =>
        currentUsers.filter(
          (currentUser) =>
            currentUser.id !== user.id
        )
      );
    } catch (requestError) {
      setError(
        requestError?.message ||
          "تعذر حذف المستخدم."
      );
    } finally {
      setDeletingId(null);
    }
  }

  const filteredUsers = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return users.filter((user) => {
      const name = String(user.name).toLowerCase();
      const email = String(user.email).toLowerCase();

      const matchesSearch =
        !searchValue ||
        name.includes(searchValue) ||
        email.includes(searchValue);

      const matchesStatus =
        status === "الكل" ||
        user.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, status]);

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "نشط"
  ).length;

  const blockedUsers = users.filter(
    (user) => user.status === "محظور"
  ).length;

  return (
    <PageContainer className="manage-users-page">
      <div className="container">

        {/* Header */}
        <section className="manage-users-header">
          <div>
            <span className="manage-users-eyebrow">
              إدارة الحسابات
            </span>

            <h1>إدارة المستخدمين</h1>

            <p>
              متابعة حسابات المستخدمين وإدارة حالاتهم
              وصلاحياتهم داخل منصة فرصتي.
            </p>
          </div>

          <button
            type="button"
            className="manage-users-primary"
            disabled
            title="إضافة المستخدمين غير متوفرة في الخدمة الحالية"
          >
            <UserPlus size={18} />
            إضافة مستخدم
          </button>
        </section>

        {/* Error */}
        {error && (
          <div className="manage-users-error">
            {error}
          </div>
        )}

        {/* Stats */}
        <section className="manage-users-stats">
          <div className="manage-users-stat">
            <div className="manage-users-stat-icon">
              <Users size={19} />
            </div>

            <div>
              <span>إجمالي المستخدمين</span>
              <strong>
                {loading ? "..." : totalUsers}
              </strong>
            </div>
          </div>

          <div className="manage-users-stat">
            <div className="manage-users-stat-icon users-green">
              <UserCheck size={19} />
            </div>

            <div>
              <span>المستخدمون النشطون</span>
              <strong>
                {loading ? "..." : activeUsers}
              </strong>
            </div>
          </div>

          <div className="manage-users-stat">
            <div className="manage-users-stat-icon users-orange">
              <UserX size={19} />
            </div>

            <div>
              <span>الحسابات المحظورة</span>
              <strong>
                {loading ? "..." : blockedUsers}
              </strong>
            </div>
          </div>

          <div className="manage-users-stat">
            <div className="manage-users-stat-icon users-purple">
              <FileCheck2 size={19} />
            </div>

            <div>
              <span>تقديمات هذا الشهر</span>
              <strong>—</strong>
            </div>
          </div>
        </section>

        {/* Main panel */}
        <section className="manage-users-panel">

          {/* Toolbar */}
          <div className="manage-users-toolbar">

            <div className="manage-users-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="ابحث بالاسم أو البريد الإلكتروني..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="manage-users-filter">
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
          <div className="manage-users-table-wrapper">

            {loading ? (
              <div className="manage-users-empty">
                <Users size={35} />

                <h3>
                  جارٍ تحميل المستخدمين...
                </h3>

                <p>
                  يتم جلب بيانات المستخدمين من الخادم.
                </p>
              </div>
            ) : (
              <>
                <table className="manage-users-table">
                  <thead>
                    <tr>
                      <th>المستخدم</th>
                      <th>الدور</th>
                      <th>الحالة</th>
                      <th>التقديمات</th>
                      <th>تاريخ التسجيل</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>

                        <td>
                          <div className="manage-user-info">
                            <div className="manage-user-avatar">
                              {user.name.charAt(0)}
                            </div>

                            <div>
                              <strong>
                                {user.name}
                              </strong>

                              <span>
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`manage-user-role ${
                              user.role === "مشرف"
                                ? "role-admin"
                                : ""
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`manage-user-status ${
                              user.status === "نشط"
                                ? "user-status-active"
                                : user.status === "معلّق"
                                ? "user-status-pending"
                                : "user-status-blocked"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td>
                          <span className="manage-user-applications">
                            {user.applications ??
                              "—"}
                          </span>
                        </td>

                        <td>
                          <span className="manage-user-date">
                            {formatDate(user.joined)}
                          </span>
                        </td>

                        <td>
                          <div className="manage-user-actions">

                            <button
                              type="button"
                              title="عرض المستخدم"
                              onClick={() => {
                                window.alert(
                                  "صفحة عرض تفاصيل المستخدم غير متوفرة حاليًا."
                                );
                              }}
                            >
                              <Eye size={15} />
                            </button>

                            <button
                              type="button"
                              title="تعديل"
                              onClick={() => {
                                window.alert(
                                  "صفحة تعديل المستخدم غير متوفرة حاليًا."
                                );
                              }}
                            >
                              <Edit3 size={15} />
                            </button>

                            <button
                              type="button"
                              title="حذف المستخدم"
                              disabled={
                                deletingId === user.id
                              }
                              onClick={() =>
                                handleDelete(user)
                              }
                            >
                              <MoreHorizontal size={17} />
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredUsers.length === 0 && (
                  <div className="manage-users-empty">
                    <Users size={35} />

                    <h3>
                      لا يوجد مستخدمون مطابقون
                    </h3>

                    <p>
                      جرّب تغيير البحث أو الفلتر.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="manage-users-footer">
            <span>
              عرض {filteredUsers.length} من{" "}
              {users.length} مستخدمين
            </span>

            <div className="manage-users-pagination">
              <button
                type="button"
                disabled
              >
                السابق
              </button>

              <button
                type="button"
                className="users-page-active"
              >
                1
              </button>

              <button
                type="button"
                disabled
              >
                التالي
              </button>
            </div>
          </div>

        </section>
      </div>
    </PageContainer>
  );
}

export default ManageUsers;