import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BriefcaseBusiness,
  Pencil,
  ShieldCheck,
  FileText,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/common/Button";

import "./Profile.css";

function Profile() {
  return (
    <PageContainer className="profile-page">

      <div className="container">

        {/* Header */}

        <div className="profile-page-header">

          <div>
            <div className="profile-breadcrumb">
              الرئيسية
              <span>/</span>
              الملف الشخصي
            </div>

            <h1>الملف الشخصي</h1>

            <p>
              حدّث معلوماتك ومهاراتك حتى تحصل على فرص
              أكثر ملاءمة لملفك.
            </p>
          </div>

          <Button variant="primary">
            <Pencil size={16} />
            تعديل الملف
          </Button>

        </div>


        {/* Main */}

        <div className="profile-layout">

          {/* Main profile */}

          <main className="profile-main">

            <section className="profile-card profile-intro">

              <div className="profile-avatar">
                ح
              </div>

              <div className="profile-intro-info">

                <h2>
                  حوراء علي
                </h2>

                <p>
                  طالبة هندسة حاسبات
                </p>

                <div className="profile-location">
                  <MapPin size={15} />
                  البصرة، العراق
                </div>

              </div>

              <div className="profile-completion">

                <div className="completion-top">
                  <span>
                    اكتمال الملف
                  </span>

                  <strong>
                    82%
                  </strong>
                </div>

                <div className="completion-bar">
                  <span
                    style={{
                      width: "82%",
                    }}
                  />
                </div>

                <small>
                  أضف السيرة الذاتية لإكمال ملفك.
                </small>

              </div>

            </section>


            {/* Personal information */}

            <section className="profile-card">

              <div className="profile-section-heading">

                <div>
                  <span className="profile-section-icon">
                    <UserRound size={17} />
                  </span>

                  <div>
                    <h2>
                      المعلومات الشخصية
                    </h2>

                    <p>
                      معلوماتك الأساسية للتواصل
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="edit-section-button"
                >
                  <Pencil size={15} />
                  تعديل
                </button>

              </div>


              <div className="profile-info-grid">

                <div className="profile-info-item">
                  <span>الاسم الكامل</span>
                  <strong>حوراء علي</strong>
                </div>

                <div className="profile-info-item">
                  <span>البريد الإلكتروني</span>
                  <strong>
                    hawraa@example.com
                  </strong>
                </div>

                <div className="profile-info-item">
                  <span>رقم الهاتف</span>
                  <strong>
                    +964 7XX XXX XXXX
                  </strong>
                </div>

                <div className="profile-info-item">
                  <span>المحافظة</span>
                  <strong>
                    البصرة
                  </strong>
                </div>

              </div>

            </section>


            {/* Education */}

            <section className="profile-card">

              <div className="profile-section-heading">

                <div>
                  <span className="profile-section-icon">
                    <GraduationCap size={17} />
                  </span>

                  <div>
                    <h2>
                      التعليم
                    </h2>

                    <p>
                      مؤهلاتك الدراسية
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="edit-section-button"
                >
                  <Pencil size={15} />
                  تعديل
                </button>

              </div>


              <div className="education-item">

                <div className="education-icon">
                  <GraduationCap size={18} />
                </div>

                <div>
                  <strong>
                    هندسة حاسبات
                  </strong>

                  <span>
                    كلية الهندسة
                  </span>

                  <small>
                    متوقع التخرج: 2027
                  </small>
                </div>

              </div>

            </section>


            {/* Skills */}

            <section className="profile-card">

              <div className="profile-section-heading">

                <div>
                  <span className="profile-section-icon">
                    <BriefcaseBusiness size={17} />
                  </span>

                  <div>
                    <h2>
                      المهارات
                    </h2>

                    <p>
                      المهارات التي تمتلكها
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="edit-section-button"
                >
                  <Pencil size={15} />
                  تعديل
                </button>

              </div>


              <div className="profile-skills">

                {[
                  "React",
                  "JavaScript",
                  "HTML",
                  "CSS",
                  "Git",
                  "GitHub",
                  "Networking",
                  "Computer Engineering",
                ].map((skill) => (
                  <span key={skill}>
                    {skill}
                  </span>
                ))}

              </div>

            </section>


            {/* CV */}

            <section className="profile-card profile-cv-card">

              <div className="profile-section-heading">

                <div>
                  <span className="profile-section-icon">
                    <FileText size={17} />
                  </span>

                  <div>
                    <h2>
                      السيرة الذاتية
                    </h2>

                    <p>
                      ملفك الحالي
                    </p>
                  </div>
                </div>

                <Link
                  to="/cv/upload"
                  className="profile-text-link"
                >
                  تحديث السيرة
                </Link>

              </div>


              <div className="cv-file-row">

                <div className="cv-file-icon">
                  <FileText size={19} />
                </div>

                <div>
                  <strong>
                    Hawraa_Ali_CV.pdf
                  </strong>

                  <span>
                    آخر تحديث منذ 3 أيام
                  </span>
                </div>

                <ChevronLeft size={17} />

              </div>

            </section>

          </main>


          {/* Sidebar */}

          <aside className="profile-sidebar">

            <div className="profile-side-card">

              <div className="side-card-icon">
                <ShieldCheck size={19} />
              </div>

              <h3>
                حسابك محمي
              </h3>

              <p>
                نحافظ على معلومات ملفك ونستخدمها
                لتحسين عرض الفرص المناسبة لك.
              </p>

              <div className="side-security-row">
                <span />
                بيانات الحساب
              </div>

              <div className="side-security-row">
                <span />
                معلومات السيرة الذاتية
              </div>

            </div>


            <div className="profile-side-card">

              <h3>
                أكمل ملفك
              </h3>

              <p>
                إضافة المزيد من المعلومات تساعدك
                على بناء ملف مهني متكامل.
              </p>

              <div className="profile-side-progress">

                <strong>
                  82%
                </strong>

                <div>
                  <span
                    style={{
                      width: "82%",
                    }}
                  />
                </div>

              </div>

              <Link
                to="/cv/upload"
                className="profile-side-link"
              >
                إضافة السيرة الذاتية
                <ChevronLeft size={15} />
              </Link>

            </div>

          </aside>

        </div>

      </div>

    </PageContainer>
  );
}

export default Profile;