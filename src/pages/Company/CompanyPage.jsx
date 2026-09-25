import {
  Building2,
  MapPin,
  Globe,
  Users,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ArrowRight,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";

import "./CompanyPage.css";

function CompanyPage() {
  const { id } = useParams();
  
  const company = {
    id: id || "company-1",
    name: "شركة تقنية العراق",
    shortName: "ITI",
    description:
      "شركة عراقية تعمل في مجال التكنولوجيا والحلول الرقمية، وتركز على تطوير المنتجات والخدمات التقنية ودعم الكفاءات المحلية.",
    location: "بغداد، العراق",
    website: "www.example.iq",
    employees: "500+",
    founded: "2012",
    industry: "التكنولوجيا والخدمات الرقمية",
    opportunities: 12,
  };

  const opportunities = [
    {
      id: 1,
      title: "مهندس Frontend أول",
      type: "وظيفة",
      location: "بغداد",
      mode: "دوام كامل",
      match: 92,
    },
    {
      id: 2,
      title: "Frontend Developer",
      type: "تدريب وتوظيف",
      location: "بغداد",
      mode: "هجين",
      match: 88,
    },
    {
      id: 3,
      title: "Software Engineering Internship",
      type: "تدريب",
      location: "بغداد",
      mode: "حضوري",
      match: 84,
    },
  ];

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

          <span>{company.name}</span>
        </div>


        {/* Company Hero */}

        <section className="company-hero">

          <div className="company-logo-large">
            <Building2 size={34} />
          </div>

          <div className="company-hero-content">

            <div className="company-title-row">

              <div>
                <div className="company-verified">
                  <CheckCircle2 size={13} />
                  جهة موثقة
                </div>

                <h1>
                  {company.name}
                </h1>

                <p>
                  {company.industry}
                </p>
              </div>

              <button
                type="button"
                className="company-save-button"
              >
                <Bookmark size={17} />
                حفظ الشركة
              </button>

            </div>


            <div className="company-meta">

              <span>
                <MapPin size={15} />
                {company.location}
              </span>

              <span>
                <Users size={15} />
                {company.employees} موظف
              </span>

              <span>
                <CalendarDays size={15} />
                تأسست {company.founded}
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
                {company.description}
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
                    الفرص المنشورة من {company.name}
                  </p>
                </div>

              </div>


              <div className="company-opportunities">

                {opportunities.map((opportunity) => (

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
                          {opportunity.type}
                        </span>

                        <span className="company-opportunity-match">
                          {opportunity.match}%
                        </span>

                      </div>

                      <h3>
                        {opportunity.title}
                      </h3>

                      <div className="company-opportunity-meta">

                        <span>
                          <MapPin size={13} />
                          {opportunity.location}
                        </span>

                        <span>
                          {opportunity.mode}
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

                ))}

              </div>


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

                  <a href="/">
                    {company.website}
                  </a>
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
                    {company.location}
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
                    {company.employees} موظف
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
                    {company.founded}
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
                  {company.opportunities}
                </strong>

                <span>
                  فرصة منشورة
                </span>

              </div>

              <div className="company-stat">

                <strong>
                  4.8
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