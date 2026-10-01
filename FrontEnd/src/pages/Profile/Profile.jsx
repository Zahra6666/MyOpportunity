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
import { useEffect, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/common/Button";

import { getMyProfile, updateMyProfile } from "../../services/userService";
import { getMyCV } from "../../services/cvService";

import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [cv, setCv] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const [profileResponse, cvResponse] = await Promise.all([
        getMyProfile(),
        getMyCV().catch(() => null),
      ]);

      const profileData =
        profileResponse?.user || profileResponse?.data || profileResponse;

      const cvData = cvResponse?.data || cvResponse || null;

      setProfile(profileData);
      setCv(cvData);

      setFormData({
        full_name: profileData?.full_name || profileData?.name || "",
        email: profileData?.email || "",
        phone: profileData?.phone || "",
      });
    } catch (err) {
      setError(err?.message || "تعذر تحميل بيانات الملف الشخصي.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setSaving(true);
    setError("");

    try {
      const response = await updateMyProfile(formData);

      const updatedProfile = response?.user || response?.data || response;

      setProfile(updatedProfile);

      setFormData({
        full_name:
          updatedProfile?.full_name ||
          updatedProfile?.name ||
          formData.full_name,
        email: updatedProfile?.email || formData.email,
        phone: updatedProfile?.phone || formData.phone,
      });

      setEditing(false);
    } catch (err) {
      setError(err?.message || "تعذر تحديث بيانات الملف الشخصي.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageContainer className="profile-page">
        <div className="container">
          <div className="profile-card">جارٍ تحميل بيانات الملف الشخصي...</div>
        </div>
      </PageContainer>
    );
  }

  const fullName = profile?.full_name || profile?.name || "المستخدم";

  const email = profile?.email || "غير متوفر";

  const phone = profile?.phone || "غير متوفر";

  const role = profile?.role || "user";

  const avatarLetter = fullName?.trim()?.charAt(0) || "م";

  const skills = Array.isArray(cv?.skills) ? cv.skills : [];

  const education = cv?.education || "";

  const hasCV = Boolean(cv);

  const completion = hasCV ? 100 : 50;

  return (
    <PageContainer className="profile-page">
      <div className="container">
        <div className="profile-page-header">
          <div>
            <div className="profile-breadcrumb">
              الرئيسية
              <span>/</span>
              الملف الشخصي
            </div>

            <h1>الملف الشخصي</h1>

            <p>حدّث معلوماتك ومهاراتك حتى تحصل على فرص أكثر ملاءمة لملفك.</p>
          </div>

          <Button
            variant="primary"
            onClick={() => setEditing((previous) => !previous)}
          >
            <Pencil size={16} />
            {editing ? "إلغاء التعديل" : "تعديل الملف"}
          </Button>
        </div>

        {error && <div className="profile-card">{error}</div>}

        <div className="profile-layout">
          <main className="profile-main">
            <section className="profile-card profile-intro">
              <div className="profile-avatar">{avatarLetter}</div>

              <div className="profile-intro-info">
                <h2>{fullName}</h2>

                <p>
                  {role === "company"
                    ? "حساب شركة"
                    : role === "admin"
                      ? "مسؤول النظام"
                      : "مستخدم"}
                </p>

                <div className="profile-location">
                  <MapPin size={15} />
                  البصرة، العراق
                </div>
              </div>

              <div className="profile-completion">
                <div className="completion-top">
                  <span>اكتمال الملف</span>

                  <strong>{completion}%</strong>
                </div>

                <div className="completion-bar">
                  <span
                    style={{
                      width: `${completion}%`,
                    }}
                  />
                </div>

                <small>
                  {hasCV
                    ? "تمت إضافة السيرة الذاتية."
                    : "أضف السيرة الذاتية لإكمال ملفك."}
                </small>
              </div>
            </section>

            <section className="profile-card">
              <div className="profile-section-heading">
                <div>
                  <span className="profile-section-icon">
                    <UserRound size={17} />
                  </span>

                  <div>
                    <h2>المعلومات الشخصية</h2>

                    <p>معلوماتك الأساسية للتواصل</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="edit-section-button"
                  onClick={() => setEditing(true)}
                >
                  <Pencil size={15} />
                  تعديل
                </button>
              </div>

              {editing ? (
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <label>الاسم الكامل</label>

                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-info-item">
                    <label>البريد الإلكتروني</label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-info-item">
                    <label>رقم الهاتف</label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-info-item">
                    <span>الدور</span>

                    <strong>{role}</strong>
                  </div>

                  <div>
                    <Button
                      variant="primary"
                      onClick={handleUpdate}
                      disabled={saving}
                    >
                      {saving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <span>الاسم الكامل</span>

                    <strong>{fullName}</strong>
                  </div>

                  <div className="profile-info-item">
                    <span>البريد الإلكتروني</span>

                    <strong>{email}</strong>
                  </div>

                  <div className="profile-info-item">
                    <span>رقم الهاتف</span>

                    <strong>{phone}</strong>
                  </div>

                  <div className="profile-info-item">
                    <span>الدور</span>

                    <strong>{role}</strong>
                  </div>
                </div>
              )}
            </section>

            <section className="profile-card">
              <div className="profile-section-heading">
                <div>
                  <span className="profile-section-icon">
                    <GraduationCap size={17} />
                  </span>

                  <div>
                    <h2>التعليم</h2>

                    <p>مؤهلاتك الدراسية</p>
                  </div>
                </div>

                <button type="button" className="edit-section-button">
                  <Pencil size={15} />
                  تعديل
                </button>
              </div>

              {education ? (
                <div className="education-item">
                  <div className="education-icon">
                    <GraduationCap size={18} />
                  </div>

                  <div>
                    <strong>{education}</strong>

                    <span>مستخرج من السيرة الذاتية</span>
                  </div>
                </div>
              ) : (
                <div className="education-item">
                  <div className="education-icon">
                    <GraduationCap size={18} />
                  </div>

                  <div>
                    <strong>لا توجد معلومات تعليمية</strong>

                    <span>ارفع سيرتك الذاتية لإضافة مؤهلاتك الدراسية.</span>
                  </div>
                </div>
              )}
            </section>

            <section className="profile-card">
              <div className="profile-section-heading">
                <div>
                  <span className="profile-section-icon">
                    <BriefcaseBusiness size={17} />
                  </span>

                  <div>
                    <h2>المهارات</h2>

                    <p>المهارات التي تمتلكها</p>
                  </div>
                </div>

                <button type="button" className="edit-section-button">
                  <Pencil size={15} />
                  تعديل
                </button>
              </div>

              <div className="profile-skills">
                {skills.length > 0 ? (
                  skills.map((skill) => <span key={skill}>{skill}</span>)
                ) : (
                  <span>لم تتم إضافة مهارات بعد</span>
                )}
              </div>
            </section>

            <section className="profile-card profile-cv-card">
              <div className="profile-section-heading">
                <div>
                  <span className="profile-section-icon">
                    <FileText size={17} />
                  </span>

                  <div>
                    <h2>السيرة الذاتية</h2>

                    <p>ملفك الحالي</p>
                  </div>
                </div>

                <Link to="/cv/upload" className="profile-text-link">
                  {hasCV ? "تحديث السيرة" : "إضافة السيرة"}
                </Link>
              </div>

              {hasCV ? (
                <div className="cv-file-row">
                  <div className="cv-file-icon">
                    <FileText size={19} />
                  </div>

                  <div>
                    <strong>{cv?.original_filename || "السيرة الذاتية"}</strong>

                    <span>ملف السيرة الذاتية</span>
                  </div>

                  <ChevronLeft size={17} />
                </div>
              ) : (
                <div className="cv-file-row">
                  <div className="cv-file-icon">
                    <FileText size={19} />
                  </div>

                  <div>
                    <strong>لا توجد سيرة ذاتية</strong>

                    <span>ارفع سيرتك الذاتية لتحليل مهاراتك وخبراتك.</span>
                  </div>

                  <ChevronLeft size={17} />
                </div>
              )}
            </section>
          </main>

          <aside className="profile-sidebar">
            <div className="profile-side-card">
              <div className="side-card-icon">
                <ShieldCheck size={19} />
              </div>

              <h3>حسابك محمي</h3>

              <p>
                نحافظ على معلومات ملفك ونستخدمها لتحسين عرض الفرص المناسبة لك.
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
              <h3>أكمل ملفك</h3>

              <p>إضافة المزيد من المعلومات تساعدك على بناء ملف مهني متكامل.</p>

              <div className="profile-side-progress">
                <strong>{completion}%</strong>

                <div>
                  <span
                    style={{
                      width: `${completion}%`,
                    }}
                  />
                </div>
              </div>

              <Link to="/cv/upload" className="profile-side-link">
                {hasCV ? "تحديث السيرة الذاتية" : "إضافة السيرة الذاتية"}

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
