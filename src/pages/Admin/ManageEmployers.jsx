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
import { useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import "./ManageEmployers.css";

const employersData = [
  {
    id: 1,
    company: "شركة تقنية العراق",
    email: "hr@iti.iq",
    industry: "التكنولوجيا",
    status: "معتمد",
    opportunities: 12,
    joined: "20 سبتمبر 2026",
  },
  {
    id: 2,
    company: "Zain Iraq",
    email: "careers@zain.iq",
    industry: "الاتصالات",
    status: "معتمد",
    opportunities: 24,
    joined: "18 سبتمبر 2026",
  },
  {
    id: 3,
    company: "Asiacell",
    email: "jobs@asiacell.com",
    industry: "الاتصالات",
    status: "بانتظار المراجعة",
    opportunities: 7,
    joined: "16 سبتمبر 2026",
  },
  {
    id: 4,
    company: "شركة البصرة للطاقة",
    email: "hr@basra-energy.iq",
    industry: "الطاقة",
    status: "معتمد",
    opportunities: 9,
    joined: "13 سبتمبر 2026",
  },
  {
    id: 5,
    company: "Iraq Digital",
    email: "hello@iraqdigital.iq",
    industry: "الخدمات الرقمية",
    status: "معلّق",
    opportunities: 4,
    joined: "10 سبتمبر 2026",
  },
  {
    id: 6,
    company: "Future Skills Academy",
    email: "info@futureskills.iq",
    industry: "التدريب والتعليم",
    status: "بانتظار المراجعة",
    opportunities: 6,
    joined: "7 سبتمبر 2026",
  },
];

const statusOptions = [
  "الكل",
  "معتمد",
  "بانتظار المراجعة",
  "معلّق",
];

function ManageEmployers() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");

  const filteredEmployers = employersData.filter((employer) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      employer.company.toLowerCase().includes(searchValue) ||
      employer.email.toLowerCase().includes(searchValue) ||
      employer.industry.toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "الكل" ||
      employer.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <PageContainer className="manage-employers-page">
      <div className="container">

        <section className="manage-employers-header">
          <div>
            <span className="manage-employers-eyebrow">
              إدارة الجهات
            </span>

            <h1>إدارة الشركات وأصحاب العمل</h1>

            <p>
              متابعة الشركات المسجلة ومراجعة طلبات اعتمادها
              وإدارة الفرص التي تنشرها على منصة فرصتي.
            </p>
          </div>

          <button
            type="button"
            className="manage-employers-primary"
          >
            <UserPlus size={18} />
            إضافة شركة
          </button>
        </section>

        <section className="manage-employers-stats">

          <div className="manage-employers-stat">
            <div className="manage-employers-stat-icon">
              <Building2 size={19} />
            </div>

            <div>
              <span>إجمالي الشركات</span>
              <strong>450</strong>
            </div>
          </div>

          <div className="manage-employers-stat">
            <div className="manage-employers-stat-icon employers-green">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <span>الشركات المعتمدة</span>
              <strong>392</strong>
            </div>
          </div>

          <div className="manage-employers-stat">
            <div className="manage-employers-stat-icon employers-orange">
              <Clock3 size={19} />
            </div>

            <div>
              <span>بانتظار المراجعة</span>
              <strong>38</strong>
            </div>
          </div>

          <div className="manage-employers-stat">
            <div className="manage-employers-stat-icon employers-red">
              <Ban size={19} />
            </div>

            <div>
              <span>الشركات المعلّقة</span>
              <strong>20</strong>
            </div>
          </div>

        </section>

        <section className="manage-employers-panel">

          <div className="manage-employers-toolbar">

            <div className="manage-employers-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="ابحث باسم الشركة أو البريد أو المجال..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="manage-employers-filter">
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

          <div className="manage-employers-table-wrapper">

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
                          <strong>
                            {employer.company}
                          </strong>

                          <span>
                            {employer.email}
                          </span>
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
                        {employer.opportunities}
                      </span>
                    </td>

                    <td>
                      <span className="manage-employer-date">
                        {employer.joined}
                      </span>
                    </td>

                    <td>
                      <div className="manage-employer-actions">

                        <button
                          type="button"
                          title="عرض الشركة"
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

            {filteredEmployers.length === 0 && (
              <div className="manage-employers-empty">
                <Building size={35} />

                <h3>
                  لايوجد شركات مطابقة
                </h3>

                <p>
                  جرب تغيير البحث أو الفلتر.
                </p>
              </div>
            )}

          </div>

          <div className="manage-employers-footer">

            <span>
              عرض {filteredEmployers.length} من{" "}
              {employersData.length} شركات
            </span>

            <div className="manage-employers-pagination">

              <button
                type="button"
                disabled
              >
                السابق
              </button>

              <button
                type="button"
                className="employers-page-active"
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

export default ManageEmployers;