import {
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PageContainer from "../../components/layout/PageContainer";
import "./UserDashboard.css";

function UserDashboard() {
  const { user } = useAuthContext();

  const userName =
    user?.name ||
    user?.full_name ||
    user?.fullName ||
    "المستخدم";

  return (
    <main className="dashboard-page" dir="rtl">
      <PageContainer>
        <section className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">
              لوحة التحكم
            </span>

            <h1>
             أهلاً بك, {userName}
            </h1>

            <p>
              من هنا تقدر تتابع فرصك المحفوظة، وتراجع ملفك الشخصي，
              وتكمل خطواتك القادمة.
            </p>
          </div>

          <Link
            to="/opportunities"
            className="dashboard-primary-button"
          >
            استكشف الفرص
            <ArrowLeft size={18} />
          </Link>
        </section>

        <section className="dashboard-stats">
          <article className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Bookmark size={22} />
            </div>

            <div>
              <span>الفرص المحفوظة</span>
              <strong>0</strong>
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <BriefcaseBusiness size={22} />
            </div>

            <div>
              <span>التقديمات</span>
              <strong>0</strong>
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <FileText size={22} />
            </div>

            <div>
              <span>السيرة الذاتية</span>
              <strong>0</strong>
            </div>
          </article>
        </section>

        <section className="dashboard-content">
          <div className="dashboard-main-card">
            <div className="dashboard-card-header">
              <div>
                <span>ابدأ من هنا</span>
                <h2>طوّر فرصك القادمة</h2>
              </div>

              <CheckCircle2 size={24} />
            </div>

            <div className="dashboard-actions">
              <Link
                to="/profile"
                className="dashboard-action-card"
              >
                <div className="dashboard-action-icon">
                  <UserRound size={21} />
                </div>

                <div>
                  <h3>حدّث ملفك الشخصي</h3>
                  <p>
                    أضف معلوماتك حتى تكون بياناتك محدثة.
                  </p>
                </div>

                <ArrowLeft size={18} />
              </Link>

              <Link
                to="/cv/upload"
                className="dashboard-action-card"
              >
                <div className="dashboard-action-icon">
                  <FileText size={21} />
                </div>

                <div>
                  <h3>حلّل سيرتك الذاتية</h3>
                  <p>
                    ارفع سيرتك واستفد من تحليلها.
                  </p>
                </div>

                <ArrowLeft size={18} />
              </Link>

              <Link
                to="/saved"
                className="dashboard-action-card"
              >
                <div className="dashboard-action-icon">
                  <Bookmark size={21} />
                </div>

                <div>
                  <h3>الفرص المحفوظة</h3>
                  <p>
                    ارجع للفرص التي حفظتها سابقًا.
                  </p>
                </div>

                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>

          <aside className="dashboard-side-card">
            <div className="dashboard-side-icon">
              <BriefcaseBusiness size={23} />
            </div>

            <h2>اكتشف فرصتك القادمة</h2>

            <p>
              تصفح الفرص المتاحة وابحث عن الفرصة التي تناسب
              مهاراتك واهتماماتك.
            </p>

            <Link
              to="/opportunities"
              className="dashboard-side-link"
            >
              تصفح الفرص
              <ArrowLeft size={17} />
            </Link>
          </aside>
        </section>
      </PageContainer>
    </main>
  );
}

export default UserDashboard;