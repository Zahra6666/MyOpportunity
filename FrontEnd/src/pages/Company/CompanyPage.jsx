import {
  Building2,
  MapPin,
  Globe,
  Users,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";

import {
  getCompanyById,
} from "../../services/companyService";

import {
  getOpportunities,
} from "../../services/opportunityService";

import "./CompanyPage.css";

function CompanyPage() {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [opportunities, setOpportunities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [opportunitiesLoading, setOpportunitiesLoading] =
    useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadCompany();
  }, [id]);

  useEffect(() => {
    loadCompanyOpportunities();
  }, [id]);

  const loadCompany = async () => {
    if (!id) return;

    setLoading(true);
    setError("");

    try {
      const response = await getCompanyById(id);

      const data =
        response?.company ||
        response?.data ||
        response;

      setCompany(data);
    } catch (err) {
      setError(
        err?.message ||
          "تعذر تحميل بيانات الشركة."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadCompanyOpportunities = async () => {
    if (!id) return;

    setOpportunitiesLoading(true);

    try {
      const response =
        await getOpportunities();

      const allOpportunities =
        response?.opportunities ||
        response?.data ||
        response?.results ||
        response ||
        [];

      const opportunitiesArray =
        Array.isArray(allOpportunities)
          ? allOpportunities
          : [];

      const companyOpportunities =
        opportunitiesArray.filter(
          (opportunity) => {
            const opportunityCompanyId =
              opportunity?.company_id ??
              opportunity?.company?.id ??
              opportunity?.companyId;

            return String(opportunityCompanyId) ===
              String(id);
          }
        );

      setOpportunities(companyOpportunities);
    } catch {
      setOpportunities([]);
    } finally {
      setOpportunitiesLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer className="company-page">
        <div className="container">
          <div className="company-card">
            جارٍ تحميل بيانات الشركة...
          </div>
        </div>
      </PageContainer>
    );
  }

  if (error || !company) {
    return (
      <PageContainer className="company-page">
        <div className="container">
          <div className="company-card">
            <p>
              {error || "لم يتم العثور على الشركة."}
            </p>

            <Link
              to="/opportunities"
              className="company-all-link"
            >
              العودة إلى الفرص
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  const companyName =
    company?.name ||
    "شركة غير معروفة";

  const companyDescription =
    company?.description ||
    "لا يوجد وصف متاح لهذه الشركة.";

  const companyLocation =
    company?.location ||
    "غير متوفر";

  const companyStatus =
    company?.status ||
    "";

  const companyLogo =
    company?.logo ||
    company?.logo_url ||
    null;

  return (
    <PageContainer className="company-page">

      <div className="container">

        {/* Breadcrumb */}

        <div className="company-breadcrumb">

          <Link to="/">
            الرئيسية
          </Link>

          <span>/</span>

          <Link to="/opportunities">
            استكشف الفرص
          </Link>

          <span>/</span>

          <span>
            {companyName}
          </span>

        </div>


        {/* Company Hero */}

        <section className="company-hero">

          <div className="company-logo-large">

            {companyLogo ? (
              <img
                src={companyLogo}
                alt={companyName}
              />
            ) : (
              <Building2 size={34} />
            )}

          </div>

          <div className="company-hero-content">

            <div className="company-title-row">

              <div>

                {companyStatus === "approved" && (
                  <div className="company-verified">
                    <CheckCircle2 size={13} />
                    جهة موثقة
                  </div>
                )}

                <h1>
                  {companyName}
                </h1>

                <p>
                  شركة على منصة فرصتي
                </p>

              </div>

            </div>


            <div className="company-meta">

              <span>
                <MapPin size={15} />
                {companyLocation}
              </span>

              <span>
                <BriefcaseBusiness size={15} />
                {opportunities.length} فرصة
              </span>

              <span>
                <CheckCircle2 size={15} />
                {companyStatus || "غير محدد"}
              </span>

            </div>

          </div>

        </section>


        {/* Content */}

        <div className="company-layout">

          {/* Main */}

          <main className="company-main">

            {/* About */}

            <section className="company-card">

              <div className="company-section-heading">

                <div className="company-section-icon">
                  <Building2 size={17} />
                </div>

                <div>

                  <h2>
                    عن الشركة
                  </h2>

                  <p>
                    معلومات عامة عن الجهة
                  </p>

                </div>

              </div>

              <p className="company-description">
                {companyDescription}
              </p>

            </section>


            {/* Opportunities */}

            <section className="company-card">

              <div className="company-section-heading">

                <div className="company-section-icon">
                  <BriefcaseBusiness size={17} />
                </div>

                <div>

                  <h2>
                    الفرص المتاحة
                  </h2>

                  <p>
                    الفرص المنشورة من {companyName}
                  </p>

                </div>

              </div>


              {opportunitiesLoading ? (

                <div className="company-description">
                  جارٍ تحميل الفرص...
                </div>

              ) : opportunities.length === 0 ? (

                <div className="company-description">
                  لا توجد فرص منشورة من هذه الشركة حاليًا.
                </div>

              ) : (

                <div className="company-opportunities">

                  {opportunities.map(
                    (opportunity) => (

                      <article
                        className="company-opportunity"
                        key={opportunity.id}
                      >

                        <div className="company-opportunity-logo">
                          <Building2 size={18} />
                        </div>

                        <div className="company-opportunity-info">

                          <div className="company-opportunity-top">

                            <span className="company-opportunity-type">
                              {opportunity?.type?.name ||
                                opportunity?.type ||
                                "فرصة"}
                            </span>

                          </div>

                          <h3>
                            {opportunity?.title ||
                              "فرصة بدون عنوان"}
                          </h3>

                          <div className="company-opportunity-meta">

                            <span>
                              <MapPin size={13} />
                              {opportunity?.location ||
                                "غير متوفر"}
                            </span>

                            <span>
                              {opportunity?.status ||
                                "غير محدد"}
                            </span>

                          </div>

                        </div>

                        <Link
                          to={`/opportunities/${opportunity.id}`}
                          className="company-opportunity-link"
                        >
                          التفاصيل
                          <ArrowRight size={15} />
                        </Link>

                      </article>

                    )
                  )}

                </div>

              )}


              <Link
                to="/opportunities"
                className="company-all-link"
              >
                عرض جميع الفرص
                <ArrowRight size={15} />
              </Link>

            </section>

          </main>


          {/* Sidebar */}

          <aside className="company-sidebar">

            <section className="company-side-card">

              <h3>
                معلومات الشركة
              </h3>


              <div className="company-side-item">

                <Globe size={16} />

                <div>

                  <span>
                    الموقع الإلكتروني
                  </span>

                  <strong>
                    غير متوفر
                  </strong>

                </div>

                <ExternalLink size={13} />

              </div>


              <div className="company-side-item">

                <MapPin size={16} />

                <div>

                  <span>
                    الموقع
                  </span>

                  <strong>
                    {companyLocation}
                  </strong>

                </div>

              </div>


              <div className="company-side-item">

                <Users size={16} />

                <div>

                  <span>
                    حجم الشركة
                  </span>

                  <strong>
                    غير متوفر
                  </strong>

                </div>

              </div>


              <div className="company-side-item">

                <CalendarDays size={16} />

                <div>

                  <span>
                    سنة التأسيس
                  </span>

                  <strong>
                    غير متوفر
                  </strong>

                </div>

              </div>

            </section>


            <section className="company-side-card company-stats-card">

              <h3>
                نشاط الشركة على فرصتي
              </h3>


              <div className="company-stat">

                <strong>
                  {opportunities.length}
                </strong>

                <span>
                  فرصة منشورة
                </span>

              </div>


              <div className="company-stat">

                <strong>
                  —
                </strong>

                <span>
                  تقييم المتقدمين
                </span>

              </div>

            </section>


            <section className="company-side-card company-cta-card">

              <h3>
                مهتم بالعمل معنا؟
              </h3>

              <p>
                استكشف الفرص الحالية وقدّم على الفرصة
                التي تناسب مهاراتك.
              </p>

              <Link
                to="/opportunities"
                className="company-cta-button"
              >
                استكشف الفرص
                <ArrowRight size={16} />
              </Link>

            </section>

          </aside>

        </div>

      </div>

    </PageContainer>
  );
}

export default CompanyPage;