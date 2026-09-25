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
import { useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import "./ManageUsers.css";

const usersData = [
  {
    id: 1,
    name: "حوراء علي",
    email: "hawraa@example.com",
    role: "مستخدم",
    status: "نشط",
    applications: 12,
    joined: "20 سبتمبر 2026",
  },
  {
    id: 2,
    name: "محمد أحمد",
    email: "mohammed@example.com",
    role: "مستخدم",
    status: "نشط",
    applications: 8,
    joined: "18 سبتمبر 2026",
  },
  {
    id: 3,
    name: "سارة علي",
    email: "sara@example.com",
    role: "مستخدم",
    status: "نشط",
    applications: 15,
    joined: "15 سبتمبر 2026",
  },
  {
    id: 4,
    name: "علي حسن",
    email: "ali@example.com",
    role: "مستخدم",
    status: "محظور",
    applications: 3,
    joined: "12 سبتمبر 2026",
  },
  {
    id: 5,
    name: "نور حسين",
    email: "noor@example.com",
    role: "مشرف",
    status: "نشط",
    applications: 0,
    joined: "10 سبتمبر 2026",
  },
  {
    id: 6,
    name: "زينب كريم",
    email: "zainab@example.com",
    role: "مستخدم",
    status: "معلّق",
    applications: 5,
    joined: "7 سبتمبر 2026",
  },
];

const statusOptions = [
  "الكل",
  "نشط",
  "معلّق",
  "محظور",
];

function ManageUsers() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");

  const filteredUsers = usersData.filter((user) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "الكل" ||
      user.status === status;

    return matchesSearch && matchesStatus;
  });

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
          >
            <UserPlus size={18} />
            إضافة مستخدم
          </button>
        </section>

        {/* Stats */}
        <section className="manage-users-stats">
          <div className="manage-users-stat">
            <div className="manage-users-stat-icon">
              <Users size={19} />
            </div>

            <div>
              <span>إجمالي المستخدمين</span>
              <strong>12,480</strong>
            </div>
          </div>

          <div className="manage-users-stat">
            <div className="manage-users-stat-icon users-green">
              <UserCheck size={19} />
            </div>

            <div>
              <span>المستخدمون النشطون</span>
              <strong>11,932</strong>
            </div>
          </div>

          <div className="manage-users-stat">
            <div className="manage-users-stat-icon users-orange">
              <UserX size={19} />
            </div>

            <div>
              <span>الحسابات المحظورة</span>
              <strong>184</strong>
            </div>
          </div>

          <div className="manage-users-stat">
            <div className="manage-users-stat-icon users-purple">
              <FileCheck2 size={19} />
            </div>

            <div>
              <span>تقديمات هذا الشهر</span>
              <strong>2,846</strong>
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
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <ChevronDown size={15} />
            </div>
          </div>

          {/* Table */}
          <div className="manage-users-table-wrapper">
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
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
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
                        {user.applications}
                      </span>
                    </td>

                    <td>
                      <span className="manage-user-date">
                        {user.joined}
                      </span>
                    </td>

                    <td>
                      <div className="manage-user-actions">

                        <button
                          type="button"
                          title="عرض المستخدم"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          title="تعديل"
                        >
                          <Edit3 size={15} />
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

            {filteredUsers.length === 0 && (
              <div className="manage-users-empty">
                <Users size={35} />

                <h3>
                  لايوجد مستخدمين مطابقين
                </h3>

                <p>
                  جرب تغيير البحث أو الفلتر.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="manage-users-footer">
            <span>
              عرض {filteredUsers.length} من{" "}
              {usersData.length} مستخدمين
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

export default ManageUsers;